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
| <p align="center">*AJAXSuccess*</p> | **Closure** | Callback function after successful AJAX implementation |  |
| <p align="center">*BeforeAJAX*</p> | **Closure** | Callback function before starting AJAX implementation. Pass `FormData: form`, this form will be sent when AJAX is executed  |  |
| <p align="center">*EnableUseLocalStorage*</p> | **Boolean** | Enable/Disable function records the user process that is handling the forms controls. The data will be stored in `localStorage`. Data will be deleted after successful AJAX or form is reset | <p align="center">`true`</p> |
| <p align="center">*FeedbackDefaultShow*</p> | **Boolean** | By default the form will be enlarged or minimized. Enlarge to: `true`; Minor: `false` | <p align="center">`false`</p> |
| <p align="center">*Headers*</p> | **Object** | An object containing header parameters will be sent when AJAX is executed  |  |
| <p align="center">*LocalItemName*</p> | **String** | Keyword used to store data in `localStorage`. It is only used when `EnableUseLocalStorage : true` | <p align="center">`FTFB_Feedback_FormData`</p> |
| <p align="center">*MilisecondsShowMessage*</p> | **Integer** | The millisecond wait to close the message since it appears  | <p align="center">`2000`</p> |
| <p align="center">*URLServer*</p> | **String** | The URL that form will execute ajax to it | |

