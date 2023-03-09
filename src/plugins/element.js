import Vue from 'vue'
import {
    Form,
    FormItem,
    Button,
    Input,
    Checkbox,
    MessageBox,
  

} from 'element-ui'
import '../theme/index.css'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.component(MessageBox.name, MessageBox)

Vue.prototype.$confirm = MessageBox.confirm



