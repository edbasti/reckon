import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import Summary from './Summary';

const Log = ({ stocks, getStocks }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [accumulatedQuotes, setAccumulatedQuotes] = useState([]); // quotes added even when pause is off
  const [updatedQuotes, setUpdatedQuotes] = useState([]); // quotes added when pause is off
  const [summary, setSummary] = useState(undefined); // quotes to be passed to Summary component

  useEffect(() => {
      setInterval(getStocks, 2000);
  });

  useEffect(() => {
    const currentDateTime = new Date().toLocaleString();
    setAccumulatedQuotes(accumulatedQuotes => accumulatedQuotes.concat(stocks));
    if (!isPaused) {
      setUpdatedQuotes(updatedQuotes => updatedQuotes.concat({ timestamp: currentDateTime, data: stocks }));
    }
  }, [stocks]);

  useEffect(() => {
    if (accumulatedQuotes) { aggregateData() };
  }, [accumulatedQuotes]);

  const aggregateData = () => {
    const result = accumulatedQuotes.reduce((acc, d) => {
      const found = acc.find(a => a.code === d.code);
      const price = { price: d.price }; // the element in data property
      if (!found) {
        acc.push({code: d.code, data: [price]}) // not found, so need to add data property
      }
      else {
        found.data.push(price) // if found, that means data property exists, so just push new element to found.data.
      }
      return acc;
    }, []);

    setSummary(result);
  }

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
  };

  const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  return (
    <Row style={{width: '90%', margin: 'auto', marginTop: '40px'}}>
      <Col>
        <Card className="text-left">
          <Card.Header>Log</Card.Header>
          <Button style={{ width: '30%', margin: '10px 10px' }} onClick={handlePauseClick}>{isPaused ? 'Resume' : 'Pause'}</Button>
          <Card.Body style={{
              maxHeight: '66vh',
              overflowY: 'auto'
            }}
          >
          {updatedQuotes && updatedQuotes.length ?
            updatedQuotes.map(quote => (
              <Card.Text key={uuidv4()}>
              Updates for {quote?.timestamp}
              {quote &&
                  <ul style={{ listStyleType: 'none' }}>
                {quote?.data?.map(item => (
                  <li key={uuidv4()}>{item?.code}: ${item?.price}</li>
                ))}
              </ul>
              }
              </Card.Text>
            ))
              :
            <Card.Text>
              Processing...
            </Card.Text>
          }
          </Card.Body>
        </Card>
        
      </Col>
      <Col>
        <Summary data={summary} />
      </Col>
    </Row>
  );
}

export default Log;