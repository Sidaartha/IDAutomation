# PS Automator
Using JavaScript to automate monotonous operations in Photoshop.

## Getting Started

Any version of Photoshop CC will work fine.
```
Note : Photoshop CC 2015 was used while developing this application.
```
### Prerequisites

* Knowledge of Layers and Groups in photoshop.
* Basic syntax of JavaScript.

## Steps to follow

### Step 1 : Creating CSV file
Create a CSV file with two columns.
* 1st columns - NAME
* 2nd columns - POST

### Step 2 : Structuring PSD layers
Create two layer, Name them as follows:
* 1st layer named "name".
* 2nd layer named "por".

  ![image](/README/1.png)

```
Note : Make sure that this two layers are not enclosed in any groups.
```
### Step 3 : Run the script
Run the script and leave the monotonous stuff to it! 

## Process overview 
Process done by the script.

* Creates "imgs" folder in the same directory as the "Template.psd".
* Saves all "JPGs" to imgs folder.
* Creates "A3" folder in the same directory as the "Template.psd".
* Stores all images in "imgs" folder to array.
* Gets images from this arrays and compiles 8 images into one set.
* Saves this A3 image set to "A3" folder.


## Visual Guid

* Open Template.psd follow the path : File > Scripts > Browse...
  ![image](/README/2.png)
  
* Load the Script (.jsx file)
  ![image](/README/3.png)
  
* User input : CSV file with contains all the Names and Posts.
  ![image](/README/4.png)
  
* Finish alert!
  ![image](/README/5.png)
  
  
## Video Tutorial 

* Ignore the layer stucture shown in the video, "Automate.jsx" has been modified to work with new layer structure.

  [![Watch the video](/README/Thumbnail.jpg)](https://youtu.be/yl-frsRGyPM)


### And thats how its done!
