# Email-boilerplate-with-pug
Email boilerplate developed with pug that takes advantage of inheritance, variables and Modularization.


----------


### Installation

Install dependencies and start the server.

```sh
$ npm install
$ npm start
```

### Steps to create new email
 
 - Create new folder inside src/emails with project name
 - Create the index.pug file and extend from desired layout.
 


----------


### Reuse Reset Attributes

 Instead of hardcode reusable attributes in each table use Reset Attributes defined in includes/general.pug
 
**example with  border="0" cellspacing="0" cellpadding="0"**
![cdac8d0d4877e407aa989709be2e514b.png](https://pictr.com/images/2017/03/27/cdac8d0d4877e407aa989709be2e514b.png)

Add your own attributes and inherence reset attributes.

table(**ownattributes**)&attributes(tableAtt)  
**Example**
![452bf9c68acd70bc5f00419a9b4baaaa.png](https://pictr.com/images/2017/03/27/452bf9c68acd70bc5f00419a9b4baaaa.png)

**Image Path**
In case of testing, you could use [Netifly](https://app.netlify.com) to deploy the images, and update the imagePath here.
![](http://i.imgur.com/rmVOewV.png)

----------
### Mixins
You could use mixins that consider the compatibility of all email clients, mixins are located in includes/mixins.pug

**Spacers**
> +spacer({width:10, height:10})  
>  Width and Height are optional.

> +vSpacer(10)  
>  Send the height value directly.

> +hSpacer(10)  
>  Send the width value directly.

Examples with vSpacer:

    +vSpacer(heightvalue)

![](http://i.imgur.com/h9GQRMt.png)  

**Backgrounds for td tag**
This mixin considers the way to render background images, it is based on [campaign monitor](https://backgrounds.cm/) advice.


> **params for background images(Use the ones you need)**
> img, bgcolor, width, height

    +tdbackground({img:'http://lorempixel.com/600/100/', width:600, height:100})&attributes(tdCenter)
	    contentblockhere 

![](http://i.imgur.com/1ha4ZAd.png)

**Buttons**
This mixin considers the way to render buttons, it is based on [campaign monitor](https://buttons.cm/) advice.

> **params for button(Use the ones you need)**
> img, color, width, height, bgcolor, bordercolor, link, radius, font-family, font-size, font-weight, text.

Example with button:

    +button({width:205, height:35, bgcolor:'#4285f4',bordercolor:'#4285f4', radius:4, text: 'Read More'})
![](http://i.imgur.com/g1N2h5t.png)

**Images**
This mixin takes advantage of alt text, and applies to alt text some styles, this way to handle image blocked is recommended by litmus team in plural-sight course.

    +addImg("http://lorempixel.com/600/200","Img main")(class="w480" width='600')

----------
### Modularization
You could develop modules inside includes/modules.
**Example in emails folder:**
![7d33d1fae0e87bc900ed684011d3dee8.png](https://pictr.com/images/2017/03/27/7d33d1fae0e87bc900ed684011d3dee8.png) 


----------

### The final build
Run next instruction and find your build inside dist folder.
 ```sh
$ npm run build
```
