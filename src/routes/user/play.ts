import {Router} from "express";
import db from "../../models/db";
import moment from "moment";

export const playRouter = Router();

playRouter.post('/', async (req, res) => {
    const { songId, userEmail } = req.body;
    try{
        const song = await db.song.findOne({where: {id: songId}, include: [{model: db.artist, attributes: ['name']}, {model: db.album, attributes: ['name']}]});
        // const artist = await db.artist.findOne({where: {name: song.artists[0].name}});
        // const song = await db.song.findOne({where: {id: songId}});
        const user = await db.user.findOne({where: {email: userEmail}});
        let [playedSong, created] = await db.played.findOrCreate({where: {songId: song.id}, defaults: {songId: song.id, date_played: moment().format("YYYY-MM-DD HH:mm:ss")}});
        if (created === false) {
            user.removePlayed(playedSong);
        }
        user.addPlayed(playedSong);
        song.reproductions += 1;
        song.save();
        return res.send({message: 'Song added to history'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})