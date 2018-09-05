import axios from 'axios'
import _ from 'lodash'

export default class Umbraco {
  baseUrl : string = 'https://slave-eagle.s1.umbraco.io/'
  restUrl : string = 'umbraco/rest/v1/content/published'

  constructor () {
  }

  async query (query : any) {
    const encodedQuery = encodeURI(query)
    const response = await axios.get(this.baseUrl + this.restUrl + 'query?query=' + encodedQuery)
    return this.formatResultPagedResult(response.data)
  }
  async getById (id : any) {
    const response = await axios.get(this.baseUrl + this.restUrl + '/' + id)
    return this.formatContentItem(response.data)
  }
  async getChildren (id : any) {
    const response = await axios.get(this.baseUrl + this.restUrl + '/' + id + '/children')
    return this.formatResultPagedResult(response.data)
  }
  async getByUrl (urlName : string) {
    const response = await axios.get(this.baseUrl + this.restUrl + '?url=' + urlName)
    return this.formatContentItem(response.data)
  }
  
  formatResultPagedResult (result : any) {
    if (!result._embedded || !result._embedded.content) {
      result.results = []
    } else {
      result.results = _.map(result._embedded.content, this.formatContentItem)
    }
    delete result._embedded
    delete result._links.content
    return result
  }
  
  formatContentItem (content : any) {
    if (!content) { throw Error('Content is undefined.') }
    Object.assign(content, content.properties)
    delete content.properties
    return content
  }
}