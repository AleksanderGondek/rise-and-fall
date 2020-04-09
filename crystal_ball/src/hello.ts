var greet: string = "Greetings"; 
var geeks: string = "Geeks For Geeks"; 

console.log(greet + " from " + geeks); 

const defaultOptions = {
  method: "GET",
  credentials: "same-origin"
};

const requestOptions = {
  method: "POST",
  redirect: "follow"
};

const options = {
  ...defaultOptions,
  ...requestOptions
};
//Comment
console.log(options);
