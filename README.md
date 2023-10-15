# Web Frameworks and Dynamic Data Assessment 2
## u3236562 Lachlan Begbie

## Rationale

### Planning Stages

The initial planning stages of this project were difficult to approach at first, largely because my limited understanding of the dynamic data content restricted what I was able to see as possible and achievable. This meant I struggled to generate substantial ideas, which is largely where the “dashboard” idea came from - it meant I could focus on small areas of the scripting for each section, and create as I learned.

The initial prototype sketches were a valuable way to see how things would be placed on the page, and although the end result looks quite different, because of the changes in content and dimensions changing when development began, they gave me a solid starting point to create the design of the site.


### Development

By the time development began, I had learned enough to see that my initial plan to build my site from the War Memorial API would be more difficult than anticipated, due to the documentation from the AWM being difficult to navigate, and the information being not easily searchable by a wide variety of API calls. So early in the process, I decided to switch to the National Museum API, which had much better and more accurate documentation.

One of the first problems I faced was working the date into the API call. The information contained within each data item had different date codes in multiple places, which made finding the right files inconsistent and difficult to get working properly. I got this working by stitching together a long version of the date (e.g. "15 October"), and placing that directly into the API call, which gave me only the results which were consistent.

Another problem faced was managing images, which many data items contained within the API did not have. It looks much better for the website if as many items as possible have images next to them, so there is not only text on the page. This problem was solved by chopping up and sorting the results returned by the API, so that the ones with images are always displayed first, and then if needed the rest filled in the space. This solution was successful and efficient, and I was able to modify the code from the assistance I was given to account for the changing code as development progressed.

A feature which didn't cause problems, but may have if I pressed to implement more features was the search function in the "Place Search" section. There is a need there for an autocompleting dropdown menu, which could be considered for future changes, but as this feature was lower priority than others, it did not end up being implemented. It would, however, have involved calling other APIs and I could see it becoming quite complex.

Implementing the modal which pops up for each item to provide more information was a particularly triumphant moment towards the end of the development process. Navigating the CSS transitions and connected JS scripting to make the modal pop up and go away was fairly straightforward, but the complex part came when figuring out how to display the correct information, which had originally come from the API calls at the beginning. To solve this, I added each data item to a two-dimensional array when first added to the page. Each item had a unique identifier code which I searched the array for and pulled the information up through that. I am not sure how efficient that method is, but it was ultimately successful.


### Reflection

Ultimately, the final product didn't end up quite as feature full as I had originally hoped, but I am happy with the outcome, as many of my original ideas came through successfully, and provided a significant challenge which I overcame and learned from. While there is much more I would like to have done, the current state of development is satisfactory by my standards.



## References

There were a number of websites, articles and sources I utilised for this project. The most common included Stack Overflow forums:

