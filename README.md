# Instant Message

## Introduction

This script allows you to create instant messages displayed at the right-bottom corner.

## Feature

- Simple & easy to use
- Animation

## How to use

First, create a `MessageContainer` object:

```{javascript}
var mc = new MessageContainer();
```

Then, add it to wherever you want (by default it will be on the right-bottom corner):

```javascript
// Example: add it to the <body> element:
document.body.addElement(mc.element);
```

When you want to display a message:

```javascript
mc.createMessage({
    title: "Message Title", // optional
    content: "Message Content",
    addTimeout: 0, // entering animation, optional, in ms, 0 to disable
                   // default value: 300
    removeTimeout: 200, // removing animation, optional, in ms, 0 to disable
                        // default value: 300
    stayTimeout: 3000 // staying time, optional, in ms, 0 to make it displayed
                      // until the user clicks the message.
                      // default value: 0
});
```

## License

The MIT License.