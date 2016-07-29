/**
 * 统一处理 redux 动作处理
 * Created by ql on 2016/6/15.
 */

'use strict';

import {
    Alert,
} from 'react-native';

import * as TYPES from '../configs/types';
import * as CONFIGS from '../configs/configs';

/**
 *  根据接口地址获取文章列表数据
 *  var int page 显示页数
 */
export function getArticleList(url, page = 1)
{
    return (dispatch, getState) => {
        dispatch({'type': TYPES.ARTICLE_LIST_DOING, 'url': url});

        let furl = url + '&page=' + page;
        fetch(furl)
            .then((response) => response.json())
            .then((data) => {
                let state = getState();
                //console.log(state);

                let isMore = false;
                if (data.pages > page) {
                    isMore = true;
                }

                let posts = data.posts;

                // 如果以前有数据则合并数据，加载更多时用到
                //if (this.state.listData != null) {
                //    posts = this.state.listData.concat(posts);
                //}

                dispatch({'type': TYPES.ARTICLE_LIST_OK, 'data': posts, 'isMore': isMore, 'url': url});
            })
            .catch((error) => {
                dispatch({'type': TYPES.ARTICLE_LIST_ERROR, 'url': url});
                Alert.alert('', error.message)
            });
    }
}


/**
  获取分类列表
*/
export function getCategoryList()
{
    return (dispatch, getState) => {
		dispatch({'type': TYPES.CATEGORY_LIST_DOING});

    	fetch(CONFIGS.CATEGORY_LIST_API)
          	.then((response) => response.json())
          	.then((data) => {
				console.log(data);
              	dispatch({'type': TYPES.CATEGORY_LIST_OK, 'data': data});
          })
          .catch((error) => {
          		dispatch({'type': TYPES.CATEGORY_LIST_ERROR});
              	Alert.alert('', error.message)
          });
  	}
}
