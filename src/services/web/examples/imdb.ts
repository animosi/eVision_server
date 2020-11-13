import axios from 'axios';
import * as cheerio from 'cheerio';

export default (async () => {
  const username = 'willsmith';
  const baseUrl = `https://instagram.com/${username}`;

  const { data } = await axios.get(baseUrl);
  const $ = cheerio.load(data);
  const script = $('script[type="text/javascript"]').eq(3).html();
  const script_regex = /window._sharedData = (.+);/g.exec(script);

  //*user - instgram user info
  const {
    entry_data: {
      ProfilePage: {
        [0]: {
          graphql: { user },
        },
      },
    },
  } = JSON.parse(script_regex[1]);

  //* edges - instagram posts made by the user
  const {
    entry_data: {
      ProfilePage: {
        [0]: {
          graphql: {
            user: {
              edge_owner_to_timeline_media: { edges },
            },
          },
        },
      },
    },
  } = JSON.parse(script_regex[1]);

  const posts = edges.map(({ node }) => ({
    id: node.id,
    shortcode: node.shortcode,
    timestamp: node.taken_at_timestamp,
    likes: node.edge_liked_by.count,
    comments: node.edge_media_to_comment.count,
    video_views: node.video_view_count,
    caption: node.edge_media_to_caption.edges[0].node.text,
  }));

  const instagram_data = {
    followers: user.edge_followed_by.count,
    following: user.edge_follow.count,
    uploads: user.edge_owner_to_timeline_media.count,
    full_name: user.full_name,
    picture_url: user.profile_pic_url_hd,
    posts,
  };
  debugger;
})();
