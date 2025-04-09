import axios, { AxiosRequestConfig } from 'axios'
import * as cheerio from 'cheerio'

import { userAgents } from './data.js'

const randomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)]
}

type searchResult = {
  idx: number
  // content: string
}

const scrapeSite = async () => {
  console.log('randomUserAgent:', randomUserAgent())

  const rawUrl = `https://www.bathandbodyworks.com/g/all-candles?start=0&sz=48`
  const url = new URL(rawUrl)
  const start = url.searchParams.get('start')
  const size = url.searchParams.get('sz')

  console.log({ start, size })

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': randomUserAgent(),
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://www.bathandbodyworks.com/',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  }
  try {
    const response = await axios.get(rawUrl, config)

    const html = response.data
    const $ = cheerio.load(html)

    const searchResultItems = $('.search-result-items li')
    const searchResults: searchResult[] = []

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchResultItems.each((idx, _) => {
      searchResults.push({ idx })
    })

    console.log(searchResults)
  } catch (error) {
    console.error('Error fetching or parsing website:', error)
  }
}

scrapeSite()
