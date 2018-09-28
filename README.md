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
| <p align="center">*AJAXSuccess*</p> | **Closure** | Callback function after successful AJAX implementation |  |
| <p align="center">*MilisecondsShowMessage*</p> | **Integer** | The millisecond wait to close the message since it appears  | <p align="center">*2000*</p> |
| <p align="center">*URLServer*</p> | **String** | The URL that form will execute ajax to it | |

