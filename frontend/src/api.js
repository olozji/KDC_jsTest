import config from "./config";

const { API_ENDPOINT } = config;

// const API_ENDPOINT = "http://localhost:4001";


// 에러메세지에 대한 정의
const REQUEST_ERROR = {
  '500': { msg:'요청실패'}
}

// 메소드 분리
const request = async (url) => {
  try {
    const result = await fetch(url);
    if(result.status === 200) {
      //console.dir(result.status);
      return result.json();
    } else {
      // 에러를 만들어줄 때 throw문을 사용
      throw REQUEST_ERROR[result.status];
    }
  } catch(err) {
    console.log(err);
    alert(err.msg);
    // 데이터가 없으면 모든 에러를 catch에 모아서 처리해줌 
    return { data: null }
  }
}

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsWithLimit: (keyword, limit) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limit}`);
  },
  fetchCatsPage: (keyword,page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  // 랜덤 고양이 api 생성
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;