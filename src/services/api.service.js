import { ref } from 'vue'
import api from './api'

class ApiService {
    getData = () => {
        const data = ref(null)

        api({
            url: `/api/data/default/`,
            method: 'GET',
        }).then(res => {
            if (res && res.status == 200) {
                // console.log('res.data.results: \n', res.data)
                data.value = res.data
            }
        }).catch(err => {
            console.log(err)
        })

        return { data }
    }

    getDataV2 = () => {
        const data = ref(null)

        api({
            url: `/api/v2/data/default/`,
            method: 'GET',
        }).then(res => {
            if (res && res.status == 200) {
                // console.log('res.data.results: \n', res.data)
                data.value = res.data
            }
        }).catch(err => {
            console.log(err)
        })

        return { data }
    }
}


export default new ApiService()