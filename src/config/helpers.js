export function getSearchParams(k) {
  if(typeof window !== 'undefined') {
    var p={};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
    return k?p[k]:p;
  }
}