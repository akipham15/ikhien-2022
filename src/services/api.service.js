import { ref } from 'vue'
import api from './api'

class ApiService {
  
    getData = () => {
        const data_default = ref(null)

        api({
            url: `/api/data/default/`,
            method: 'GET',
        }).then(res => {
            if (res && res.status == 200) {
                console.log('res.data.results: ', res.data.results)
                data_default.value = res.data.results
            }
        }).catch(err => {
            console.log(err)
        })

        return { data_default }
    }
}


export default new ApiService()