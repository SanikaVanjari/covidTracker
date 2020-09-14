export const sortData = (data) => {
  const sortedData = [...data]
  //sorting method
  //   sortedData.sort((a, b) => {
  //     if (a.cases > b.cases) {
  //       return -1
  //     } else {
  //       return 1
  //     }
  //   })
  //shortcut sorting method
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}
