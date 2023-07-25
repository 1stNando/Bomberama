In this assignment, you will communicate with a back-end API server to create the user-interface for a Minesweeper clone. It might help to familiarize yourself with the game if you have never played it.

Objectives

Understand how state drives changes to an interface in React
Respond to user events in React
Understand and use REST APIs
Use React lifecycle methods
Understand and interpret API documentation
Use fetch or axios to perform POST request or

Requirements

Read over the documentation for the API we will be using:

https://minesweeper-api.herokuapp.com/

You will need to interpret the response and render a graphical user interface. The API results include an array of arrays (two-dimensional array). These represent rows and columns. Consider using flexbox, grid, or an old-fashioned table to organize these.

Here is an example implementation of this assignment:

Explorer Mode

Create a button to create a new game. Use the animated gif above as a user interface guide. Do at least that much, but also feel free to have fun.
Style the cells appropriately.
Left-clicking a cell performs the check action
Right/secondary clicking a cell performs the flag action
When the game status changed to won or lost a victory or failure message - Do not use alert for this. Update the user interface.
