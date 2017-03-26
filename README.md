# Email-generator-with-pug
Email generator using pug for the structure taking advantage of  inheritance, variables and Modularization using includes.

### Installation

Install dependencies and start the server.

```sh
$ npm install
$ npm start
```

### Steps to create new email
 
 - Create new folder inside src/emails with project name
 - Create the index.pug file and extend from desired layout.
 
### Reuse Reset Attributes

 Instead of hardcode  reusable attributes in each table use Reset Attributes defined in includes/general.pug
 
**example with  border="0" cellspacing="0" cellpadding="0"**
![cdac8d0d4877e407aa989709be2e514b.png](https://pictr.com/images/2017/03/27/cdac8d0d4877e407aa989709be2e514b.png)

Add your own attributes and inherence reset attributes.

table(**ownattributes**)&attributes(tableAtt)  
**Example**
![452bf9c68acd70bc5f00419a9b4baaaa.png](https://pictr.com/images/2017/03/27/452bf9c68acd70bc5f00419a9b4baaaa.png)

### Modularization
You could develop modules inside includes/modules.
**Example in emails folder:**
![7d33d1fae0e87bc900ed684011d3dee8.png](https://pictr.com/images/2017/03/27/7d33d1fae0e87bc900ed684011d3dee8.png) 


### The final build
Run next instruction and find your build inside dist folder.
 ```sh
$ npm run build
```
