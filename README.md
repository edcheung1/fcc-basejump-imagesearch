## FCC Basejump: Image Search Abstraction Layer
#### User stories:

* I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
Ex. `https://edcheung-fcc-imgsearch.herokuapp.com/api/imagesearch/<insert search term here>`
* I can paginate through the responses by adding a ?offset=2 parameter to the URL.
Ex. `https://edcheung-fcc-imgsearch.herokuapp.com/api/imagesearch/<insert search term here>?offset=<offset amount>`
* I can get a list of the most recently submitted search strings.
Ex. `https://edcheung-fcc-imgsearch.herokuapp.com/api/latest/imagesearch/`