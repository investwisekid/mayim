"""Publish scheduled Recognition items whose date has arrived.

Run by .github/workflows/publish-news.yml once a day (and on demand).
Reads _scheduled/news.json, and for each item whose "publish" date (UTC) is today
or earlier and that isn't published yet:
  - inserts its cards into "In the news" (kept newest first by data-date),
  - inserts its milestones into the timeline (kept oldest first by data-date),
  - applies its text replacements,
then marks it published and updates the Recognition entry in sitemap.xml.
"""
import datetime
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE = os.path.join(ROOT, "_scheduled", "news.json")
PAGE = os.path.join(ROOT, "recognition.html")
SITEMAP = os.path.join(ROOT, "sitemap.xml")

CARD_RE = re.compile(r'<article class="press-card[^"]*" data-date="(\d{4}-\d{2})"')
ITEM_RE = re.compile(r'<li class="rec-item" data-date="(\d{4}-\d{2})"')


def line_start(html, pos):
    return html.rfind("\n", 0, pos) + 1


def insert_card(html, card, iso):
    for m in CARD_RE.finditer(html):
        if m.group(1) < iso:                      # newest first
            p = line_start(html, m.start())
            return html[:p] + card + "\n" + html[p:]
    p = line_start(html, html.index("<!-- /press-list -->"))
    return html[:p] + card + "\n" + html[p:]


def insert_milestone(html, li, iso):
    for m in ITEM_RE.finditer(html):
        if m.group(1) > iso:                      # oldest first
            p = line_start(html, m.start())
            return html[:p] + li + "\n" + html[p:]
    p = line_start(html, html.index("<!-- /milestones -->"))
    return html[:p] + li + "\n" + html[p:]


def main():
    today = os.environ.get("PUBLISH_DATE") or datetime.datetime.utcnow().date().isoformat()
    queue = json.load(open(QUEUE, encoding="utf-8"))
    html = open(PAGE, encoding="utf-8").read()
    done = []
    for it in queue["items"]:
        if it.get("published") or it["publish"] > today:
            continue
        for card in it.get("cards", []):
            iso = CARD_RE.search(card).group(1)
            html = insert_card(html, card, iso)
        for li in it.get("milestones", []):
            iso = ITEM_RE.search(li).group(1)
            html = insert_milestone(html, li, iso)
        for old, new in it.get("replace", []):
            if old in html:
                html = html.replace(old, new, 1)
            else:
                print(f"warning: [{it['id']}] text not found, skipped: {old[:60]}", file=sys.stderr)
        it["published"] = today
        done.append(it["id"])

    if not done:
        print("nothing to publish")
        return
    open(PAGE, "w", encoding="utf-8").write(html)
    json.dump(queue, open(QUEUE, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    sm = open(SITEMAP, encoding="utf-8").read()
    sm = re.sub(r"(<loc>https://www\.mayimflow\.com/recognition</loc><lastmod>)[^<]+", r"\g<1>" + today, sm)
    open(SITEMAP, "w", encoding="utf-8").write(sm)
    print("published:", ", ".join(done))


if __name__ == "__main__":
    main()
