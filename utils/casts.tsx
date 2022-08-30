// Credit: https://github.com/gskril/farcaster-search/blob/d709a9fa9126cb93eede4336c1af3e4ed3d78e06/src/utils/cast.js

export function formatCastText(text: string, searchQuery: string) {
  const links = text.match(
    // Regex to identify URLS with .com, .xyz, .net, or .org extension (it doesn't have to start with http:// or https://)
    /\b(?:https?:\/\/)?[-a-zA-Z0-9@:%._+~#=][-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );

  if (links) {
    links.forEach((link) => {
      text = text.replace(
        link,
        // If a link doesn't already start with http:// or https://, add it
        `<a href="${
          link.match(
            // Regex to identify an ENS name
            /^(?!(http|https))(.*)\.eth$/
          )
            ? `https://rainbow.me/${link}`
            : link.startsWith("http")
            ? link
            : `https://${link}`
        }" target="_blank" rel="noopener">${link}</a>`
      );
    });
  }

  const farcasterUri = text.match(
    // Regex to identify a Farcater URI
    /farcaster:\/\/casts\/([a-zA-Z0-9_]+)\/([a-zA-Z0-9_]+)/g
  );

  if (farcasterUri) {
    farcasterUri.forEach((uri) => {
      const shortenedUri = uri.slice(0, 20) + "..." + uri.slice(-10);
      text = text.replace(
        uri,
        `<a href="${uri}" rel="noopener">${shortenedUri}</a>`
      );
    });
  }

  const mention = text.match(
    // Regex to identify a @username mention
    /@([a-zA-Z0-9_]+)/g
  );

  if (mention) {
    mention.forEach((mention) => {
      // If the mention is at the beginning of the text, or it has a space before it, it's a valid mention
      if (
        text.startsWith(mention) ||
        text.split(mention)[0].endsWith(" ") ||
        text.split(mention)[1].startsWith(" ")
      ) {
        text = text.replace(
          mention,
          `<a href="/search?username=${mention.slice(1)}">${mention}</a>`
        );
      }
    });
  }

  if (searchQuery) {
    const matches = new RegExp(searchQuery, "gi");
    text = text.replace(matches, `<b>${searchQuery}</b>`);

    // remove <b> tags from hrefs
    const hrefs = text.match(/href="([^"]*)"/g);
    if (hrefs) {
      hrefs.forEach((href) => {
        text = text.replace(href, href.replace(/<\/?b>/g, ""));
      });
    }
  }

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
}
