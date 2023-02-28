Express Inventory Application:
Express Inventory Applicaiton is an educational project that was being built with the intention of learning and practicing creating a backend in node.js using Express. My goal for this application was to create sensible models using a no-SQL database in order to practice CRUD operations. The app simulates a store database system keeping track of the item types that the store holds, the individual instances of each item, and the categories/departments that each item belongs in.

What I Learned/What I Would Do Differently:
One difficulty that I encountered when working on this project was that there were times when I updated multiple controller methods simultaneously and then tried to test the application to check if it worked properly. However, in the instances where there was a small error in the code, it became difficult to identify what exactly had broke the application. As all of these changes were being pushed directly to main, it made it difficult to keep track of exactly what I had changed on each commit and what the results were. In the future, especially when working on collaborative projects, I will use branches to organize the changes that I push to the repo in order to make the content of each change clear and reversible to aid with the identification of bugs. Additionally, this will make sure that my commits are easy to follow if the project is viewed by someone in the future.

Credits:
This project was inspired as a response to the Project: Inventory Application lesson of the NodeJS Course on the Odin Project. Additionally, the mdn tutorial express-locallibrary-tutorial was inspiration for the structure of this application. The mdn tutorial can be found at https://github.com/mdn/express-locallibrary-tutorial

Technologies Used:
Javascript
Node.js
Express
Pug
Mongoose and MongoDB

Build Status:
This application is still being developed and is not entirely finished. Currently, the itemInstance delete POST function has not been finished. Additionally, all update functions have not yet been finished. There is currently a bug with the Delete Category page where a list of ALL item instances is displayed rather than only the item instances of the chosen category. This is intended to be fixed after the CRUD methods are finished.
Additionally, when the database was populated, all item types and item instances were doubled, but it does not affect the functionality of the app.

Installation:

1. Clone repo from GitHub
2. In terminal run the command: npm install
3. Copy link for MongoDB connection into environment variable with the name MONGO_STRING (link below in Api Refence header)
4. In terminal run the command: run npm devstart
5. Go to localhost:3000 in a web browser

Api Reference:
This application uses a cloud-based MongoDB database hosed by MongoDB Atlas. The data has been pre-loaded onto an Atlas cluster which the application can connect to using the following URL:
mongodb+srv://Cluster1:Cluster1@cluster1.zgnogbk.mongodb.net/inventory_application?retryWrites=true&w=majority
Note: This cluster contains no sensitive information related to the creator. This information was previously stored in an environment variable but is listed here for ease of reproducibility. Alternatively, rather than connecting to the cluster, a user can create their own cluster and populate the data by running the populatedb.js in the terminal.

How The Application Works:
Start by entering the home page. From here, you will see the total counts of all item types, instances, and categories. On the left navbar, you can choose the type of action you wish to perform.

<img src="./public/images/Home.png" alt="Alt text" title="Optional title">

-Seeing all item types-
From the home page, the All items button in the navbar will list all the item types that are available in the store.

<img src="./public/images/Item_list.png" alt="Alt text" title="Optional title">

-Seeing the details for an item type-
From the item type list, each individual item type can be clicked on to show its pertitent information.

<img src="./public/images/item_detail.png" alt="Alt text" title="Optional title">

-Deleting an item type-
From the Item Detail page, an item can be deleted or updated. If the delete button is selected, the user will either confirm the deletion or be asked to delete all instances of the item type first.

<img src="./public/images/item_delete.png" alt="Alt text" title="Optional title">

-The same process can be repeated for both the categories and item instances by clicking on the All categories or All item-instances links in the navbar on the left of the home page. Two example photos are included below.

<img src="./public/images/category_detail.png" alt="Alt text" title="Optional title">

<img src="./public/images/iteminstance_list.png" alt="Alt text" title="Optional title">

-Creating new item types, categories, and instances-
The bottom half of the navbar allows the user to create new categories, item types, and instances. Each link will display a form requesting the user to input all of the necessary information.

Category Form
<img src="./public/images/category_create.png" alt="Alt text" title="Optional title">

Item Type Form
<img src="./public/images/item_create.png" alt="Alt text" title="Optional title">

Item Instance Form
<img src="./public/images/iteminstance_create.png" alt="Alt text" title="Optional title">
