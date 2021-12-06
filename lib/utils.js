

function esAPI(req) {
    // miramos si la peticioón viene del api
    return req.originalUrl.startsWith('/api/');
}

function noHay(loencuentra){
    if (!loencuentra) {
        res.status(404).json({error: 'No lo encuentra'});
        return;
    }
}

module.exports = {
    esAPI,
    noHay
}