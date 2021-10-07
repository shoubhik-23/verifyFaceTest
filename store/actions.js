import axios from 'axios';
import {
  CRIMINAL_KEY,
  rapidHeader,
  RAPID_KEY,
  THE_NEWS_API_KEY,
  TIME_TAGS_KEY,
  ZENSERP_KEY,
} from '../constants/constants';
// import {
//   RAPID_KEY,
//   CRIMINAL_KEY,
//   ZENSERP_KEY,
//   COURT_LISTENER_KEY,
//   TIME_TAGS_KEY,
//   THE_NEWS_API_KEY,
// } from '@env';

export const zenserp = (q, tbm, searchEngine) => {
  return {
    type: 'GET_DATA',
    payload: {
      client: 'zenserp',
      request: {
        url: '/search',
        params: {
          apikey: ZENSERP_KEY,
          tbm: tbm,
          q: q,
          search_engine: searchEngine,
          hl: 'en',
        },
      },
    },
  };
};

export const contextWeb_Trending = () => {
  return {
    type: 'GET_DATA',
    payload: {
      client: 'contextWeb',

      request: {
        url: '/search/TrendingNewsAPI',
        params: {
          pageNumber: '1',
          pageSize: '10',
          withThumbnails: 'false',
          location: 'us',
        },
        headers: rapidHeader,
      },
    },
  };
};
export const contextWeb_News = q => {
  return {
    type: 'GET_DATA',
    payload: {
      client: 'contextWeb',

      request: {
        url: '/search/NewsSearchAPI',
        params: {
          pageNumber: '1',
          q: q,
          pageSize: '10',
          withThumbnails: 'false',
          location: 'us',
        },
        headers: rapidHeader,
      },
    },
  };
};
export const contextWeb_Web = q => {
  return {
    type: 'GET_DATA',
    payload: {
      client: 'contextWeb',

      request: {
        url: '/Search/WebSearchAPI',
        params: {
          pageNumber: '1',
          q: q,
          pageSize: '10',
          withThumbnails: 'false',
          location: 'us',
        },
        headers: rapidHeader,
      },
    },
  };
};
export const contextWeb_ImageSearch = q => {
  return {
    type: 'GET_DATA',

    payload: {
      client: 'contextWeb',

      request: {
        url: '/Search/ImageSearchAPI',
        params: {
          q: q,
          pageNumber: '1',
          pageSize: '10',
          autoCorrect: 'true',
        },

        headers: rapidHeader,
      },
    },
  };
};
export const contextWeb_AutoComplete = () => {
  return {
    type: 'GET_DATA',

    payload: {
      client: 'contextWeb',

      request: {
        url: '/spelling/AutoComplete',
        params: {text: 'dow'},

        headers: rapidHeader,
      },
    },
  };
};
export const contextWeb_NewsSearch = () => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'contextWeb',
      request: {
        url: '/search/NewsSearchAPI',
        params: {
          q: 'taylor swift',
          pageNumber: '1',
          pageSize: '10',
          autoCorrect: 'true',
          fromPublishedDate: 'null',
          toPublishedDate: 'null',
        },
        headers: rapidHeader,
      },
    },
  };
};
export const jailBase = source_ID => {
  return {
    type: 'GET_DATA',
    payload: {
      client: 'jailBase',
      request: {
        url: '/recent/',
        params: {source_id: source_ID},
        headers: {
          'x-rapidapi-host': 'jailbase-jailbase.p.rapidapi.com',
          'x-rapidapi-key': RAPID_KEY,
        },
      },
    },
  };
};
export const tinEyeUrl = (url, limit) => {
  return {
    type: 'GET_DATA',
    payload: {
      client: 'tinEye',
      request: {
        url: '/rest/search/',
        params: {
          image_url: url,
          limit: limit,
        },
        headers: {
          'x-api-key': '6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^',
        },
      },
    },
  };
};
export const tinEyeFile = (file, limit) => {
  const formData = new FormData();
  formData.append('image_upload', file);
  return {
    type: 'GET_DATAFILE',
    payload: {
      client: 'tinEye',
      request: {
        url: '/rest/search/',
        method: 'POST',
        params: {
          limit: limit,
        },
        headers: {
          'x-api-key': '6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^',
        },
        data: formData,
      },
    },
  };
};

export const completeCriminalCheck = (firstName, lastName, database) => {
  return {
    type: 'GET DATAC',
    payload: {
      client: 'criminalCheck',

      request: {
        url: '/api/v2/json',
        params: {
          DataBase: database,
          state: 'All',
          firstname: firstName,
          lastname: lastName,
          exact: 0,
          aka: 0,
          limit: 20,
          apikey: CRIMINAL_KEY,
        },
      },
    },
  };
};
export const theNewsApi_All = () => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'theNewsApi',
      request: {
        url: '/all',
        params: {
          api_token: THE_NEWS_API_KEY,
        },
      },
    },
  };
};
export const theNewsApi_Top = () => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'theNewsApi',
      request: {
        url: '/top',
        params: {
          api_token: THE_NEWS_API_KEY,
        },
      },
    },
  };
};
export const courtListenerOriginatingCourtInfo = () => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'courtListener',
      request: {
        url: '/originating-court-information/',
      },
    },
  };
};
export const courtListenerDocket = () => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'courtListener',
      request: {
        url: '/dockets/',
      },
    },
  };
};
export const courtListenerAudio = () => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'courtListener',
      request: {
        url: '/audio/',
      },
    },
  };
};
export const courtListenerSearch = q => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'courtListener',
      request: {
        url: '/search/',
        params: {
          q: q,
        },
      },
    },
  };
};
export const timeTags = q => {
  return {
    type: 'GET DATA',
    payload: {
      client: 'timeTags',
      request: {
        params: {
          query: q,
          max: 5,
          'api-key': TIME_TAGS_KEY,
        },
      },
    },
  };
};
