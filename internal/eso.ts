import { temme } from "https://deno.land/x/deno_temme@v1.0.0/mod.ts";

const postsSelector = `
article@ {
  img.img-responsive[src=$image];
  .link-block h3{$title};
  .link-block p{$summary};
  .link-block a[href=$link];
  .link-block a[href=$id|split('/')|last];
  .date {$created_at|trim|split(' ')|first}
  .date a@tags {
    &[href=$link]{$text};
    &[href=$name|split('/')|last];
  };
}
`;

export type Posts = {
  image: string;
  title: string;
  summary: string;
  link: string;
  id: string;
  created_at: string;
  tags: Array<{
    link: string;
    text: string;
  }>;
};

export async function getPosts(page: number, lang = "cn"): Promise<Posts> {
  const response = await fetch(
    `https://www.elderscrollsonline.com/${lang}/ajax/archive/all/?page=${page}`
  );
  const html = await response.text();
  return temme(html, postsSelector);
}

export type Post = {
  image: string;
  title: string;
  summary: string;
  link: string;
  id: string;
  created_at: string;
  tags: Array<{
    link: string;
    text: string;
  }>;
  content: string;
};

const postSelector = `
h1{$title};
div.tags a@tags {
  &[href=$link]{$text};
  &[href=$name|split('/')|last];
}
.date{$date}
.lead-img[src=$image];
.blog-body-box{html($content|trim)}
`;

export async function getPost(
  id: string | number,
  lang = "cn"
): Promise<Post> {
  const response = await fetch(
    `https://www.elderscrollsonline.com/${lang}/news/post/${id}`
  );
  const html = await response.text();
  return temme(html, postSelector);
}
