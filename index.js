// Hi! My name is Jeddy Hwang and this is my submission for the eVisit Software Engineering challenge. Answers to questions will be provided below.

/*
For a brief introduction to my design philosophy, I tried to keep my solutions at O(n) or lower in order to optimize performance. Since 
speed was the highlighted factor for these functions, limiting the time complexity to something as high as common array methods seemed plausible.
Solutions were coded in repl.it under the 90 minute time constraint.
*/

// request_handle(ip_address)
/*
The code works by first initializing an empty array to house each IP address as a separate object. The function would then initialize a new IP
object using the parameter "ipAddress", then proceed to check if the array is empty or not. If the array is empty, it will simply push that new
object into the array.
The second conditional checks to see if that IP address already exists using the .some() method. If it returns true, the for loop will enact
and find the IP object with the corresponding address and increase its hits counter.
The third conditional will simply push the IP object if the prior two do not apply.

This approach was used in lieu of a single object because accessing key-value pairs using array indexing is more convenient than using IP addresses 
as key values. This also makes accessing stored values in memory simple because each IP object is indexed starting at 0. I also considered using
two arrays, but that seemed unnecessary when it comes to memory allocation.

The runtime complexity of this function should be O(n), since it is upper-bound by an indefinite number of IP addresses hitting the server
(theoretically millions).

I would test this function by filling the IP address array with random IP addresses (shorthanded to simple integers) and log the resulting array.
*/

let ipAddressList = [];

const requestHandled = function(ipAddress) {

// Instanitate the object
  let newIP = {
    address: ipAddress,
    hits: 1
  };

  if(ipAddressList.length === 0) {
    ipAddressList.push(newIP);
  } else if(ipAddressList.some((element) => element.address === ipAddress)) {
      // Loop through the array and find the correct IP address object and increase its hits count
      for(let i = 0; i < ipAddressList.length; i++) {
        if(ipAddressList[i].address === ipAddress) {
          ipAddressList[i].hits += 1;
        }
      }
  } else {
    ipAddressList.push(newIP);
  }
};

// top100()
/*
The initial thought process was to use the .sort() method, but that solution does not optimize time complexity. Instead, I attempted to use a queue
system by putting the first 100 addresses into an array (using the assumption of millions of addresses per day) and find the minimum value of hits 
for those arrays. I would then compare the rest of the  IP address hits to that minimum value and replace it if it is larger than that value. 
Unfortunately, what I failed to consider is that I'd have to re-sort the 100 queue to ensure that the new minimum value is at the end of the 
top100 array, making it easy to pop and push new IP addresses if I needed to (pop and push for speed). 
Upon completion of the time constraint, I did some further research and found that binary heaps might be the solution; I am going to try implementing this on my own time.

As mentioned before, the .sort() method and .compare() method were options but not used to try and efficiently optimize the speed of this function.

The runtime complexity (of the proposed solution) would either be O(log(n)) or O(n) depending on the queue method or the binary heap method.

I would test this with a similar method as request_handled, but also using time measurements (using .now()) to determine how the process increases
with each proposed solution.

The following code snippet is where I stopped at the 90 minute mark.
*/

const top100 = function() {
    // Create an empty array to house the top 100 hits
    let top = [];

    // Find the minimum value and set it to min, then compare that value with the next values and replace apropriately
    for(let i = 0; i < ipAddressList.length; i++) {
      let min = ipAddressList[i].hits;

      // Push to the top array
      top.push(ipAddressList[i])[i];
      if(min < top[i].hits) {
        min = top[i].hits;
      }
    }

    console.log(min);
    return top;

    // I unfortunately didn't get to comparing the rest of the IP address hits
};

// clear()
/*
This function had many options I considered such as shifting, popping, etc. using a loop, but I tried a simpler approach. I thought that by setting the length
of the array to 0, it would automatically delete the contents while keeping the original array name for function reference. 

I picked this approach because I wanted to try and implement a solution that doesn't use a loop, thus reducing the time complexity significantly. 
I also tried to avoid using .splice() and opted for a cleaner solution that's easy to read for those who don't have experience with code.

The runtime complexity of this solution is O(1).

I would test this by logging the array and checking any references to the array to see if it actually doesn't contain objects.
*/

const clear = function() {
    ipAddressList.length = 0;
}

/*
I appreciate the opportunity to attempt this challenge! I really enjoyed trying to problem solve the three fuctions and found myself with more topics
to research after the 90 minutes. I wish I could have found a solution to top100(), but it provided me with a rich learning experience and thinking
outside the box. If there are any questions please let me know at jedidiah.hwang.dev@gmail.com. Thank you for your time!
*/