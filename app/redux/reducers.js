/**
 * 统一处理 redux reducer 处理
 * Created by ql on 2016/6/16.
 */

'use strict';

import {combineReducers} from 'redux';
import * as TYPES from '../configs/types';

// 文章列表处理
function articleList(state = {}, action)
{
    switch (action.type) {
        case TYPES.ARTICLE_LIST_DOING:
            state[action.url] = {...state[action.url], loading: true};
            return Object.assign({}, state);
        case TYPES.ARTICLE_LIST_OK:
            state[action.url] = {...state[action.url], loading: false, loaded: true, data: action.data, isMore: action.isMore};
            return Object.assign({}, state);
        case TYPES.ARTICLE_LIST_ERROR:
            state[action.url] = {...state[action.url], loading: false, loaded: true,};
            return Object.assign({}, state);
        default:
            return state;
    }
}

// 分类列表处理
function category(state = {}, action)
{
    switch (action.type) {
        case TYPES.CATEGORY_LIST_DOING:
            state = {...state, loading: true};
            return Object.assign({}, state);
        case TYPES.CATEGORY_LIST_OK:
            state = {...state, loading: false, loaded: true, data: action.data};
            return Object.assign({}, state);
        case TYPES.CATEGORY_LIST_ERROR:
            state = {...state, loading: false, loaded: true,};
            return Object.assign({}, state);
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    articleList,
	category,
});

export default rootReducer;
