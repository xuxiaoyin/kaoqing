import originJSONP from 'jsonp'
/*
jsonp(url,option,callbackFn)
{name:1,age:20}
www.aaa.com/?  
*/
export default function(url,data,option){
	 url+=(url.indexOf('?')<0 ? '?' : '&' )+param(data);
	return new Promise(function(resolve,reject){
		originJSONP(url,option,function(err,res){
				if(!err){
					resolve(res);
				}else{
					reject(err)
				}
		})
	})
}
/*
{name='aa',age=20}
&name=aa&age=20
*/
function param(data){
	let url='';
	for(let key in data){
		let item =data[key]!==undefined ? data[key] : '';
		url+=`&${key}=${encodeURIComponent(item)}`
	}
	return url ? url:'';
}
