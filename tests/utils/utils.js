
export function mockLocalStorage(){
  let mockStorage ={};
global.localStorage={
  getItem: (key)=>{
    return mockStorage[key];
  },
  setItem: (key,content)=>{
    mockStorage[key] =content ;
  },
  removeItem: (key)=>{
    delete mockStorage[key];
  }
}
}