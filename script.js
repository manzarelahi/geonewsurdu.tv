const rssFeeds = [
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/0', title: 'تازہ ترین' },
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/1', title: 'قومی خبریں' },
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/2', title: 'بین الاقوامی خبریں' },
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/3', title: 'کھیل' },
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/4', title: 'تفریح' },
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/5', title: 'صحت' },
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/6', title: 'دلچسپ و عجیب' },
  { url: 'https://www.geonewsurdu.tv/rssfeeds/1/7', title: 'تجارت' }
];

const seenLinks = new Set();

async function fetchAllFeeds() {
  const container = document.getElementById("newsContainer");
  container.innerHTML = '';

  for (let feed of rssFeeds) {
    const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(feed.url);

    try {
      const response = await fetch(proxyUrl);
      const data = await response.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");
      const items = xml.querySelectorAll("item");

      const section = document.createElement("div");
      section.className = "news-section";

      const heading = document.createElement("h2");
      heading.textContent = feed.title;
      section.appendChild(heading);

      const group = document.createElement("div");
      group.className = "news-group";

      items.forEach((item, index) => {
        if (index >= 10) return;

        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const description = item.querySelector("description").textContent;

        let imageUrl = null;
        const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
          imageUrl = imgMatch[1];
        }

        const isNew = !seenLinks.has(link);
        seenLinks.add(link);

        const card = document.createElement("div");
        card.className = "news-card";

        // Add background highlight for new stories only in 'تازہ ترین' feed or none (your choice)
        if (isNew && feed.url === 'https://www.geonewsurdu.tv/rssfeeds/1/0') {
          card.classList.add("new-update");
        }

        // Add badge only for new stories from 'تازہ ترین' feed
        const badgeHTML = (isNew && feed.url === 'https://www.geonewsurdu.tv/rssfeeds/1/0') 
                          ? '<span class="fresh-badge">تازہ خبر</span>' 
                          : '';

        card.innerHTML = `
          ${imageUrl ? `<img src="${imageUrl}" alt="News Image">` : ''}
          <h3>
            ${badgeHTML}
            <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>
          </h3>
        `;

        group.appendChild(card);
      });

      section.appendChild(group);
      container.appendChild(section);

    } catch (err) {
      console.error("Error fetching feed:", feed.url, err);
    }
  }
}

fetchAllFeeds();
setInterval(fetchAllFeeds, 120000);
  const USERNAME = "geo";
  const PASSWORD = "news123";

  const input = prompt("براہ مہربانی یوزرنیم درج کریں:");
  const pass = prompt("پاسورڈ درج کریں:");

  if (input !== USERNAME || pass !== PASSWORD) {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:100px;'>غلط یوزرنیم یا پاسورڈ</h2>";
    throw new Error("Unauthorized");
  }