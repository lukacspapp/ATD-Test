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