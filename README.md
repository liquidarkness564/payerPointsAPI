# Payer Points API

## Choose How to Interact

There's two ways to be able to interact with this service. Both options will be listed below along with their instructions.

### 1. Direct Interaction

#### Go to http://18.224.64.250:3000

You can easily interact with this API by going directly to http://18.224.64.250:3000 in your browser. This will bring you to a bare single page application that allows you to interact with the service.

1. You can first add a transaction by typing in a payer and the amount of points to add, then clicking add Transaction. This will send a transaction along with the timestamp to the database that's setup on the same server as this client. This will also add the point to the total amount of points that payer has

2. You can then click on the button "Click to view all payers" to get a list of all the payers from the database along with the amount of points each has.

3. To spend the points, under the Spend Points title, simply add the total amount of points you want to spend. The logic at the server will take the points from the oldest transactions from those particular payers first until the total points spend is 0. When the button is clicked, it will render a list of the payers and the difference in points based on the time the transactions were made.

Note: If you spend more points than there is total amongst all payers, the points will be subtracted from all payers in the order of the transactions leading to all payers having 0 points left, and the returned results will reflect the difference in what the payers had left.

### 2. Local Host Installation

If you'd like to launch the service locally in your browser and to view the code locally on your computer, you can follow these steps to do so.

Note: Although the client will be launched locally from your computer, interacting with the backend service itself is still performed at the same server address as listed above. Therefore, if you decide to follow both of these steps, you'll notice that the same transactions and payers will exist from this method as was created from the first method.

1. First, clone this repo to a local folder on your computer
2. navigate into that cloned folder, and then type ```npm install```. This will download all the needed packages for the local server to run.
3. Once the packages are done installing, type ```npm run start```. This will start up the local server on your computer at port 3000.
4. Open your brower and go to http://localhost:3000. This will open a simple web application.
5. For instructions on how to interact with this, follow the 3 informational steps listed under Direct Interaction in this document.

The backed server for this application is currently being hoted an an AWS EC2 instance. The address for this instance is the same address used to interact with the service in the first Direct Interaction method.

for any bugs or issues, feel free to open an issue, or email me at liquidarkness1997@gmail.com