/**
 * 配置文件
 *
 * Created by ql on 2016/6/15.
 */

// 首页api地址
export const INDEX_LIST_API = {name: '能源评论', url: 'http://112.124.18.75/api/get_recent_posts/?exclude=content,excerpt,comments,attachments'};

// 分类列表api地址
export const CATEGORY_LIST_API = 'http://112.124.18.75/api/get_category_index/';

// 分类文章列表api地址
export const  CATEGORY_CONTENT_API = 'http://112.124.18.75/api/get_category_posts/?exclude=content,excerpt,comments,attachments&id=';

// 文章内容地址
export const  ARTICLE_CONTENT_API = 'http://112.124.18.75/my-post.php?id=';
