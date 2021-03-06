# FeedbackJS

Generate HTML form in screen and ajax submit form to your server

## Introduce

- Generate form HTML to feedback.
- AJAX form to backend
- Support controls: Input (text, file), Select, Textarea, Button

## Installation

### 1. HTML

```html
<script src="/path/to/feedback.min.js"></script>
```

### 2. ReactJS

```js
class Utility extends Component{

    componentDidMount(){
        require('/path/to/feedback.min.js');
    }

}
```
## Configuration

**Feedback plugin** support config at constant `_ftCfg`.

| Name | Type | Description | Default|
|------|------|-------------|--------|
| <p align="center">*AJAXError*</p> | **Closure** | Callback function after AJAX implementation failed |  |
| <p align="center">*AJAXSuccess*</p> | **Closure** | Callback function after successful AJAX implementation | |
| <p align="center">*BeforeAJAX*</p> | **Closure** | Callback function before starting AJAX implementation. Pass `FormData: form`, this form will be sent when AJAX is executed  | |
| <p align="center">*EnableUseLocalStorage*</p> | **Boolean** | Enable/Disable function records the user process that is handling the forms controls. The data will be stored in `localStorage`. Data will be deleted after successful AJAX or form is reset | <p align="center">`true`</p> |
| <p align="center">*FeedbackBackgroundColor*</p> | **Hex Color String** | <p>The background color of the feedback form. Use Hex Color with 3 or 6 characters | <p align="center">`#fff`</p> |
| <p align="center">*FeedbackBorderColor*</p> | **Hex Color String** | <p>The border color of the feedback form. Use Hex Color with 3 or 6 characters | <p align="center">`#5ca2e0`</p> |
| <p align="center">*FeedbackBoxHeight*</p> | **String** | <p>Height of feedback form. Can use `%` or `px` units</p><p>Range</p><p>`%`: `1 - 99`</p><p>`px`: `1 - 999`</p> | <p align="center">`450px`</p> |
| <p align="center">*FeedbackBoxLayer*</p> | **Integer** | The form's layer is on the other HTML elements of the document. It is the `z-index` in CSS | <p align="center">`999999`</p> |
| <p align="center">*FeedbackBoxWidth*</p> | **String** | <p>Width of feedback form. Can use `%` or `px` units</p><p>Range</p><p>`%`: `1 - 99`</p><p>`px`: `1 - 999`</p> | <p align="center">`300px`</p> |
| <p align="center">*FeedbackButtonBackgroundColor*</p> | **Hex Color String** | <p>The background color of the buttons. Use Hex Color with 3 or 6 characters | <p align="center">`#5ca2e0`</p> |
| <p align="center">*FeedbackButtonBackgroundColor*</p> | **Hex Color String** | <p>The font color of the buttons. Use Hex Color with 3 or 6 characters | <p align="center">`#fff`</p> |
| <p align="center">*FeedbackDefaultShow*</p> | **Boolean** | By default the form will be enlarged or minimized. Enlarge to: `true`; Minimized: `false` | <p align="center">`false`</p> |
| <p align="center">*FeedbackDistanceRows*</p> | **String** | <p>The distance between the upper and lower line controls</p><p>Range: `10 - 30`</p> | <p align="center">`15px`</p> |
| <p align="center">*FeedbackHeadBackgroundColor*</p> | **Hex Color String** | The background color of the form header. Use Hex Color with 3 or 6 characters | <p align="center">`#5ca2e0`</p> |
| <p align="center">*FeedbackHeadHeight*</p> | **String** | <p>The height of the form header. Use `px` unit</p><p>Range: `1 - 99`</p> | <p align="center">`30px`</p> |
| <p align="center">*FeedbackHeadTextColor*</p> | **Hex Color String** | The font color of the form header. Use Hex Color with 3 or 6 characters | <p align="center">`#fff`</p> |
| <p align="center">*FeedbackHeadTextSize*</p> | **String** | <p>The font size of the form header. Use `px` unit.</p></p><p>Range: `10 - 29`</p> | <p align="center">`16px`</p> |
| <p align="center">*FeedbackIconSize*</p> | **String** | <p>Size of icon in form header. Use `px` unit.</p></p><p>Range: `10 - 20`</p> | <p align="center">`16px`</p> |
| <p align="center">*FeedbackMessagePosition*</p> | **String** | <p>The position of the message. There are two values `top` and `bottom` | <p align="center">`bottom`</p> |
| <p align="center">*FeedbackPositionX*</p> | **String** | The position of the feedback form on the document horizontally. There are two values `left` and `right` | <p align="center">`right`</p> |
| <p align="center">*FeedbackPositionY*</p> | **String** | The position of the feedback form on the document vertically. There are two values `top` and `bottom` | <p align="center">`bottom`</p> |
| <p align="center">*FeedbackShowScrollBarX*</p> | **Boolean** | When controls are set up, they can overflow the form. Then the control overflow from the form will be hidden. Set this value to true to display the horizontal scroll bar | <p align="center">`false`</p> |
| <p align="center">*FeedbackShowScrollBarY*</p> | **Boolean** | When multiple controls are set, they can overflow the form. Then the control overflow from the form will be hidden. To be able to interact with them, the scroll bar should be displayed. Set this value to `true` to display the scroll bar vertically | <p align="center">`true`</p> |
| <p align="center">*FeedbackTextboxBackgroundColor*</p> | **Hex Color String** | The background color of the controls. Use Hex Color with 3 or 6 characters | <p align="center">`#fff`</p> |
| <p align="center">*FeedbackTextboxBorderColor*</p> | **Hex Color String** | The border color of the controls. Use Hex Color with 3 or 6 characters | <p align="center">`#5ca2e0`</p> |
| <p align="center">*Headers*</p> | **Object** | An object containing header parameters will be sent when AJAX is executed  | |
| <p align="center">*LocalItemName*</p> | **String** | Keyword used to store data in `localStorage`. It is only used when `EnableUseLocalStorage : true` | <p align="center">`FTFB_Feedback_FormData`</p> |
| <p align="center">*MilisecondsShowMessage*</p> | **Integer** | The millisecond wait to close the message since it appears | <p align="center">`2000`</p> |
| <p align="center">*URLServer*</p> | **String** | The URL that form will execute ajax to it | |

## Form controls

### 1. Variable

An array or an object named `_ftFormCtrl` is defined that specifies the controls used within the form. Include buttons of the form. Each of its elements is an object including the label and control information, which may contain multiple controls in each such object.

```js
const _ftFormCtrl = [

];
```

### 2. Object controls

An object demo control

```js

{
    name : "Label name",
    tags : [
        // This is list controls for row
        {
            tag : "textbox", // input
            attr : {
                type : "text",
                name : "demo_input_text",
                ...
            }
        },
        ...
    ]
}

```

### 3. Object control doesn't have label

A control object does not have a label

```js
{
    tags : [
        // This is list controls for row
        {
            tag : "textbox", // input
            attr : {
                type : "text",
                name : "demo_input_text",
                ...
            }
        },
        ...
    ]
}
```

### 4. Object input file

```js
{
    tags : [
        // This is list controls for row
        {
            tag : "textbox", // input
            attr : {
                type : "file",
                name : "demo_input_file",
                multiple : true,
                ...
            }
        },
        ...
    ]
}
```

### 5. Object select

```js
{
    tags : [
        // This is list controls for row
        {
            tag : "select", // input
            attr : {
                name : "demo_select",
                ...
            },
            opts : [
                { value : "val_opt_1", text : "Text opt 1" },
                { value : "val_opt_2", text : "Text opt 2" },
                ...
            ]
        },
        ...
    ]
}
```

### 6. Object textarea

```js
{
    tags : [
        // This is list controls for row
        {
            tag : "textarea", // input
            attr : {
                name : "demo_select",
                rows : 5,
                ...
            },
        },
        ...
    ]
}
```


### 7. Object button

```js
{
    tags : [
        // This is list controls for row
        {
            tag : "button", // input
            attr : {
                type : "submit",
            },
        },
        {
            tag : "button",
            attr : {
                type : "button"
            },
            events : {
                click : "_clearButton"
            }
        }
        ...
    ]
}
```

`_clearButton` is a defined method that resets the form and data in localStorage. It can not be called directly as a function.

## Funtions

### 1. _ftSetMessage(message [, type = "error"]);

This is a function for displaying messages on a form.

- **Message:** The message content will be displayed.

- **type:** Message type, there are two values `error` and` success`. The default is `error`.