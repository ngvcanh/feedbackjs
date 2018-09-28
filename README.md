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
| <p align="center">*FeedbackBoxHeight*</p> | **String** | <p>Height of feedback form. Can use `%` or `px` units</p><p>`%`: `1 - 99`</p><p>`px`: `1 - 999`</p> | <p align="center">`450px`</p> |
| <p align="center">*FeedbackBoxLayer*</p> | **Integer** | The form's layer is on the other HTML elements of the document. It is the `z-index` in CSS | <p align="center">`999999`</p> |
| <p align="center">*FeedbackBoxWidth*</p> | **String** | <p>Width of feedback form. Can use `%` or `px` units</p><p>`%`: `1 - 99`</p><p>`px`: `1 - 999`</p> | <p align="center">`300px`</p> |
| <p align="center">*FeedbackDefaultShow*</p> | **Boolean** | By default the form will be enlarged or minimized. Enlarge to: `true`; Minimized: `false` | <p align="center">`false`</p> |
| <p align="center">*FeedbackHeadBackgroundColor*</p> | **Hex Color String** | The background color of the form header. Use Hex Color with 3 or 6 characters | <p align="center">`#5ca2e0`</p> |
| <p align="center">*FeedbackHeadHeight*</p> | **String** | <p>The height of the form header. Can use `%` or `px` units</p><p>Range: `1 - 99`</p> | <p align="center">`30px`</p> |
| <p align="center">*FeedbackHeadTextColor*</p> | **Hex Color String** | The font color of the form header. Use Hex Color with 3 or 6 characters | <p align="center">`#fff`</p> |
| <p align="center">*FeedbackPositionX*</p> | **Boolean** | The position of the feedback form on the document horizontally. There are two values `left` and `right` | <p align="center">`right`</p> |
| <p align="center">*FeedbackPositionY*</p> | **Boolean** | The position of the feedback form on the document vertically. There are two values `top` and `bottom` | <p align="center">`bottom`</p> |
| <p align="center">*Headers*</p> | **Object** | An object containing header parameters will be sent when AJAX is executed  | |
| <p align="center">*LocalItemName*</p> | **String** | Keyword used to store data in `localStorage`. It is only used when `EnableUseLocalStorage : true` | <p align="center">`FTFB_Feedback_FormData`</p> |
| <p align="center">*MilisecondsShowMessage*</p> | **Integer** | The millisecond wait to close the message since it appears | <p align="center">`2000`</p> |
| <p align="center">*URLServer*</p> | **String** | The URL that form will execute ajax to it | |

