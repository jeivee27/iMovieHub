
let popAdAlreadyLaunched = false;
function launchPopAd() {
  if (popAdAlreadyLaunched) return;
  setTimeout(() => {
    var l=window,k="fed6e471b4c88049ce9a5b28346f6a05",
    q=[["siteId",660*471-720+4884663],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
    z=["d3d3LmNkbjRhZHMuY29tL2xibHVlaW1wLWdhbGxlcnkubWluLmNzcw==","ZDNnNW92Zm5nanc5YncuY2xvdWRmcm9udC5uZXQvdE9wL2JjaXJjbGVzLm1pbi5qcw=="],
    m=-1,h,x,r=function(){clearTimeout(x);m++;if(z[m]&&!(1771664380000<(new Date).getTime()&&1<m)){h=l.document.createElement("script");h.type="text/javascript";h.async=!0;var e=l.document.getElementsByTagName("script")[0];h.src="https://"+atob(z[m]);h.crossOrigin="anonymous";h.onerror=r;h.onload=function(){clearTimeout(x);l[k.slice(0,16)+k.slice(0,16)]||r()};x=setTimeout(r,5E3);e.parentNode.insertBefore(h,e)}};
    if(!l[k]){try{Object.freeze(l[k]=q)}catch(e){}r()}
    popAdAlreadyLaunched = true;
  }, 5000);
}

function showToast(message = "Loading...") {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.visibility = 'visible';
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.visibility = 'hidden';
  }, 3000);
}

function openPlayer(id, type='movie') {
  showToast("Loading your movie...");
  launchPopAd();
  console.log("Opening player for ID:", id);
}
