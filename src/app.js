import './styles.scss'
import { getChartData } from './data'
import { chart } from './chart'

const tgChar = chart(document.getElementById('chart'), getChartData())

tgChar.init()
