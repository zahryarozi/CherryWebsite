document.writeln('<div id="statuscafe"><div id="statuscafe-username"></div><div id="statuscafe-content"></div></div>');
fetch("https://status.cafe/users/zahryarozi/status.json")
    .then( r => r.json() )
    .then( r => {
        if (!r.content.length) {
            document.getElementById("statuscafe-content").innerHTML = "No status yet."
            return
        }
    document.getElementById("statuscafe-username").innerHTML = '<a style="color: #C78593; text-decoration:none; text-align: center;" href="https://status.cafe/users/zahryarozi" target="_blank">' + r.author + ': ' + '</a> ' + ' ' + r.timeAgo
    document.getElementById("statuscafe-content").innerHTML = r.content
    })