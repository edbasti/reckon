import { Card, Table } from 'react-bootstrap';

const Summary = ({ data }) => {
  const stockData = data?.map(item => 
    {
      return {
        stock: item.code,
        starting:item.data[0].price,
        lowest: item.data.reduce((min, b) => Math.min(min, b.price), item.data[0].price),
        current: item.data[item.data.length - 1].price,
      };
  });
  
  const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  return (
    <Card className="text-left">
      <Card.Header>Summary</Card.Header>
      <Card.Body>
        {stockData && stockData.length ?
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Starting</th>
                <th>Lowest</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>
              {stockData &&
                stockData.map(item => (
                  <tr key={uuidv4()}>
                    <td>{item.stock}</td>
                    <td>${item.starting}</td>
                    <td>${item.lowest}</td>
                    <td>${item.current}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
          :
          <b>Processing...</b>
        }
      </Card.Body>
    </Card>
  );
}

export default Summary;
