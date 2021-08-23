
const showMessages = ({ setRoom, setFocusRoom }) => {

    return async (e) => {
        console.log('Show Message');
        setRoom({
            avatarSrc: e.currentTarget.dataset.avatarSrc,
            roomName: e.currentTarget.dataset.roomName,
        });
        setFocusRoom(e.currentTarget.dataset.roomId)



    }
}

export default showMessages;