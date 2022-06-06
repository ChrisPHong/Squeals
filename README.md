# Squeals

## Live Link:
Hello! [Squeals](https://squeals.herokuapp.com/) is a place where you explore businesses around you and even upload your own business to share that you're in the neighborhood! Follow this [link](https://squeals.herokuapp.com/) to check it out

### Home Page
![image](https://user-images.githubusercontent.com/98856057/172088500-0414920a-5682-4186-bcb6-4cd8c3d1a873.png)


## Squeals Summary
Squeals allows signed in users to create their own business and post reviews for the businesses. Users are able to explore through each of the businesses and see all of the details for each business including: title, address, phone number, and a short description about their business.

## Future Features
Due to a time constraint of completing Squeals within a week, I hope to include these features in the near future:
- Search/filters
- AWS Upload
- Google Maps
- Mark Reviews funny, cool, useful etc
- Profile
- Friends

## Technical Implementation Details
When creating Squeals, there were a lot of thoughts and brain storming involved in how to make a functional website that allows the user to create a business with also having reviews under it. One of the technical struggles that I had was trying to display the list of reviews for a specific business. I believe there's a cleaner way of accessing the state without having to list out all of the reviews and then have to loop through them all again in order to showcase the matching reviews.

```
const reviews = useSelector((state) => Object.values(state.review));
    const newReviews = reviews.filter(review => review.businessId == businessId)
    
    {newReviews.length > 0 ? newReviews.map(review => {
                    return (
                        <div key={`outerDiv${review.id}`}>
                            <h2 key={`h2${review.id}`}>Review</h2>
                            <label key={`label${review.id}`}>Review:</label>
                            <div key={`answer${review.id}`}>{review.answer}</div>
                            <div key={`rating${review.id}`}>Rating: {review.rating}</div>
                        </div>
                    )
                }) : <div>
                    <h3>This Business Has No Reviews</h3>
                    <h4>Be the First to Review!</h4>
                </div>}
    
```

## Feature List:
In Squeals, there are two [features](https://github.com/ChrisPHong/Squeals/wiki/Feature-List) that you can interact with: Businesses and Reviews! As a logged in User, you can create your own business, read other businesses, update your business, and delete your business. You can also create reviews, edit your reviews, delete your reviews, and read any review for that specified business.



## React Components
React was used as the frontend in creating Squeals. Here is a list of the components that were used in order to create Squeals!
- BusinessEditPage
- BusinessFormPage
- BusinessPage
- LoginFormPage
- Navigation
- PageNotFound
- ReviewEditFormPage
- ReviewsPage
- SignupFormPage
- SplashPage


## DataBase Schema
In order to create the backend, I used Sequelize in order to create the models, migrations, and seeders. Here is a link to the [database schema](https://github.com/ChrisPHong/Squeals/wiki/Database-Schema) used for Squeals.


## FrontEnd Routes
In order to navigate through Squeals, frontEnd Routes were needed to distinguish between which routes were used by certain components. These are the [FrontEnd Routes](https://github.com/ChrisPHong/Squeals/wiki/FrontEnd-Routes) that were used for [Squeals](https://squeals.herokuapp.com/).


## API Routes
Here are the [API Routes](https://github.com/ChrisPHong/Squeals/wiki/API-Routes) that were used in order to access the database.


## Redux Store Tree Document
The image displayed below is a diagram of the redux store tree for a specific business with its reviews. Redux was used in order to update the information displayed and send information back to the database in order to update, delete, create and read data. 
![image](https://user-images.githubusercontent.com/98856057/171960136-46f15d9b-5f11-4491-8c81-cf79f034d4bc.png)
