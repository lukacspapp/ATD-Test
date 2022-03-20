Search
Table

Make the content of the table responsive.
Get to the nested info Children price

const {
        data: { data }, // deconstructing response.
        data: { meta },
      } = await axios.get(
        `https://global.atdtravel.com/api/products?geo=en&offset=${offset}&limit=10&title=${title}`
      );

How to get the the meta info, need investigation.
Error handling and loading stage -> Making sure to check the response array.length
Pagination when we scroll into view we should call th api next page 
also the filter.

can we do Lazy loading/ with next? 


