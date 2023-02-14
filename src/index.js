import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 

function Square(props)
{

  return(
    <button className='square' 
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component
{

  renderSquare(i)
  {
    return( 
      <Square 
          value={this.props.squares[i]} 
          onClick={()=>this.props.onClick(i)}
      />
    );
  }

  render()
  {
    //const status_player = 'NextPlayer :X';
    return(
      <div>   
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      history:[
        {squares : Array(9).fill(null)}
      ],
      xIsNext: true
    };
  }

  handleClick(i)
  {
    const history = this.state.history;
    const current = history[history.length-1];
    const updateSquare=current.squares.slice();
    if(calculateWinner(updateSquare) || updateSquare[i])
    {   
      return;
    }

    updateSquare[i]=this.state.xIsNext ? 'X':'O';
    this.setState(
      {
        history : history.concat([
                  {squares:updateSquare}]),

        xIsNext: !this.state.xIsNext
      });
  }
  
  render()
  {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = calculateWinner(current.squares);
    let status;
    if(winner)
    {
      status = "Winner is : " + winner;
    }
    else
    {

      status ="Nextplayer is :" +(this.state.xIsNext ? 'X':'O');
    }

    return(
      <div className='Game'>
        <div className='Game-Info'>
          <h3>{status}</h3>
        </div>
        <div className='Game-Board'> 
            <Board 
              squares={current.squares} 
              onClick={(i) => this.handleClick(i)}
            />
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game/>);

function calculateWinner(squares)
{
  console.log("calculate winner called");

   const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let i=0;
    for(i=0;i<winnerLines.length;i++)
    {
        const [a,b,c]=winnerLines[i];
        console.log("Square[a]=",squares[a],"squares[b]",squares[b],"Squares[c]=",squares[c]);
 //       if(squares[a]===squares[b]===squares[c])
 if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 

        {
          console.log("return winner :",squares[a]);
          return squares[a];
        }
    }
    console.log("return calculate winner:null");
    return null;
}