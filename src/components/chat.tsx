import * as React from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
const user = {
  id: 1,
  avatarUrl: "https://via.placeholder.com/24/008000/008000.png"
};
const bot = {
  id: 0
};
const initialMessages = [{
  author: bot,
  suggestedActions: [{
    type: 'reply',
    value: 'Oh, really?'
  }, {
    type: 'reply',
    value: 'Thanks, but this is boring.'
  }],
  timestamp: new Date(),
  text: "Hello, this is a demo bot. I don't do much, but I can count symbols!"
}];

const Chat2 = () => {
  const [messages, setMessages] = React.useState(initialMessages);

  const addNewMessage = event => {
    let botResponse = Object.assign({}, event.message);
    botResponse.text = countReplayLength(event.message.text);
    botResponse.author = bot;
    setMessages([...messages, event.message]);
    setTimeout(() => {
      setMessages(oldMessages => [...oldMessages, botResponse]);
    }, 1000);
  };

  const countReplayLength = question => {
    let length = question.length;
    let answer = question + " contains exactly " + length + " symbols.";
    return answer;
  };

  return <div style={{height:"500px"}}>
        <Chat user={user} messages={messages} onMessageSend={addNewMessage} placeholder={"Type a message..."} width={400}  />
      </div>;
};

export default Chat2;

// import 'react-chat-elements/dist/main.css';
// import PerfectScrollbar from 'react-perfect-scrollbar'
// // MessageBox component
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import { MessageBox,Input,Button} from 'react-chat-elements'
// import "bootstrap/dist/css/bootstrap.min.css"
//
// const Chat = () =>{
//         return (
//             <div style={{height:"400px"}}>
//             <PerfectScrollbar>
//             <MessageBox
//                 avatar={"https://cdn1.vectorstock.com/i/1000x1000/36/15/businessman-character-avatar-isolated-vector-12613615.jpg"}
//                 position={"right"}
//                 type={"text"}
//                 text={"Salom"}
//                 date={new Date("2021-07-08T16:03:00" )}
//             /> <br/>
//             <MessageBox
//                 avatar={"https://cdn4.vectorstock.com/i/1000x1000/75/33/flat-style-character-avatar-icon-vector-19367533.jpg"}
//                 position={"left"}
//                 type={"text"}
//                 text={"Alik"}
//                 date={new Date("2021-07-08T16:04:00" )}
//             /><br/>
//             <MessageBox
//                  avatar={"https://cdn1.vectorstock.com/i/1000x1000/36/15/businessman-character-avatar-isolated-vector-12613615.jpg"}
//                 position={"right"}
//                 type={"text"}
//                 text={"Nima gap"}
//                 date={new Date("2021-07-08T16:04:00" )}
//             /><br/>
//             <MessageBox
//                  avatar={"https://cdn4.vectorstock.com/i/1000x1000/75/33/flat-style-character-avatar-icon-vector-19367533.jpg"}
//                 position={"left"}
//                 type={"text"}
//                 text={"Teshli uzinada nima gapla"}
//                 date={new Date("2021-07-08T16:04:00" )}
//             /><br/>
//             <MessageBox
//                  avatar={"https://cdn1.vectorstock.com/i/1000x1000/36/15/businessman-character-avatar-isolated-vector-12613615.jpg"}
//                 position={"right"}
//                 type={"text"}
//                 text={"Xa xudoga wukur"}
//                 date={new Date("2021-07-08T16:04:00" )}
//             /><br/>
//
//             <div className="container"><div className="row"><div className="col-md-10"><Input placeholder={"Type Your Message here"}/></div><div className="col-md-1"><Button  text={"Send"}/></div></div></div>
//                 </PerfectScrollbar>
//                 </div>
//         )
// }
//
// export default  Chat;