<script setup>
import { reactive } from 'vue'
import * as XLSX from 'xlsx'
import deliveryOrderService from '@/deliveryorders/services/DeliveryOrderService'
import router from '@/router'

const deliveryData = reactive([])
const channelCompositions = reactive([])
const tableData = reactive([])


const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    deliveryData.push(...extractDeliveryData(jsonData))
    channelCompositions.push(...extractChannelCompositions(jsonData))

    const mergedData = mergeData(deliveryData, channelCompositions)
    tableData.push(...mergedData)
    console.log(tableData)
  }

  reader.readAsArrayBuffer(file)
}

const addChannel = (index) => {
  tableData[index].channelCompositions.push({
    channelName: '',
    weight: {
      value: '',
      unit: 'KG',
    },
    numberOfBoxes: '',
    address: '',
  })
}

const deleteChannel = (index, channelIndex) => {
  tableData[index].channelCompositions.splice(channelIndex, 1)
}

const deleteItem = (index) => {
  tableData.splice(index, 1)
}

const submit = async () => {
  console.log(tableData)
  tableData.map(async (item) => {
      await deliveryOrderService.importRawDeliveryData(item).then(
        (response) => {
          router.push({ name: 'DeliveryOrders' })
        },
        (error) => {
          console.log(error)
        },
      )
    },
  )
}


function extractDeliveryData(jsonData) {
  const result = []
  jsonData.map((line, i) => {
    if (i !== 0) { // skip header
      result.push({
          billOfLadingNumber: jsonData[i][0],
          totalWeight: {
            value: jsonData[i][1],
            unit: 'KG',
          },
          totalNumberOfBoxes: jsonData[i][2],
        },
      )
    }
  })
  return result
}

function extractChannelCompositions(jsonData) {
  const result = []
  jsonData.map((line, i) => {
    line.map((cell, j) => {
      if (isNotHeaderLine(i)
        && skipFirst3Columns(j)
        && isChannelBeginning(j)
        && cellIsNotEmpty(jsonData[i][j])
      ) {
        result.push({
          lineIndex: i - 1,
          channelName: jsonData[0][j],
          weight: {
            value: jsonData[i][j + 1],
            unit: 'KG',
          },
          numberOfBoxes: jsonData[i][j],
          address: '',
        })
      }
    })

  })
  return result
}

function isNotHeaderLine(line) {
  return line !== 0
}

function skipFirst3Columns(column) {
  return column > 2
}

function isChannelBeginning(column) {
  return column % 2 === 1
}

function cellIsNotEmpty(cell) {
  return !!String(cell).trim() && String(cell) !== '0'
}

function mergeData(deliveryData, channelCompositions) {
  return deliveryData.map((delivery, i) => {
    let matchingChannelCompositions = channelCompositions.filter(
      (channel) => channel.lineIndex === i,
    )

    // Remove the lineIndex property from each item
    matchingChannelCompositions = matchingChannelCompositions.map(channel => {
      // eslint-disable-next-line no-unused-vars
      const { lineIndex, ...rest } = channel
      return rest
    })

    return {
      ...delivery,
      channelCompositions: matchingChannelCompositions,
    }
  })
}
</script>

<template>
  <v-main class="main">
    <v-container class="pt-0">
      <v-row class="justify-center">
        <v-col cols="12" md="2">
          <input class="mt-10" type="file" @change="handleFileUpload" />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col>
          <v-table class="data-table mt-6">
            <thead>
            <tr>
              <th>Bill Of Lading Number</th>
              <th>Total Weight (KG)</th>
              <th>Total Number Of Boxes</th>
              <th>Channel Compositions</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td><input type="text" v-model="item.billOfLadingNumber" /></td>
              <td><input type="number" v-model="item.totalWeight.value" /></td>
              <td><input type="number" v-model="item.totalNumberOfBoxes" /></td>
              <td>
                <div v-for="(channel, channelIndex) in item.channelCompositions" :key="channelIndex">
                  <v-row class="mt-4">
                    <v-col>
                      <v-row>
                        <v-col>
                          Channel:
                          <input type="text" v-model="channel.channelName" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          Weight:
                          <input type="number" v-model="channel.weight.value" /></v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          Number of Boxes:
                          <input type="number" v-model="channel.numberOfBoxes" /></v-col>
                      </v-row>
                      <v-row class="mb-4">
                        <v-col>
                          Address:
                          <input type="text" v-model="channel.address" /></v-col>
                      </v-row>
                    </v-col>
                    <v-col class="justify-center align-self-center">
                      <v-btn density="compact" @click="deleteChannel(index, channelIndex)">❌</v-btn>
                    </v-col>
                  </v-row>

                  <hr class="mb-5">

                </div>
                <div>
                  <v-btn class="mb-5" density="compact" @click="addChannel(index)">Add Channel</v-btn>
                </div>
              </td>
              <td>
                <v-btn density="compact" @click="deleteItem(index)">❌</v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="2">
          <v-btn color="#f47a00" class="mt-3" @click="submit">Submit</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<style scoped>
/* This will set the width of the first column */

.data-table {
  table, th, td {
    border: 1px solid black;
  }
}

.data-table th:nth-child(1) {
  width: auto;
}

.data-table th:nth-child(2) {
  width: auto;
}

.data-table th:nth-child(3) {
  width: auto;
}

.data-table th:nth-child(4) {
  width: 500px;
}

.data-table th:nth-child(5) {
  width: auto;
}

input[type="text"], input[type="number"] {
  border: grey 1px solid;
}
</style>
