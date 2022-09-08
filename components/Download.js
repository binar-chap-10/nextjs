import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Document, Page, Text, View, Image, StyleSheet, BlobProvider } from "@react-pdf/renderer";

const Pdfreact = (items) => {
    return (
        <Document>
            <Page size={"A4"} style={style.page}>
                <Text style={style.title}>Batu-Gunting-Kertas</Text>
                <Image
                    alt="gambar"
                    style={style.image}
                    src="data:image/png;base64,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"
                />
                <View style={style.section}>
                    <Text style={style.text}>
                        Batu-Gunting-Kertas adalah sebuah permainan tangan dua orang. Permainan ini sering digunakan untuk pemilihan acak, seperti halnya pelemparan koin, dadu, dan lain-lain. Beberapa permainan dan olahraga menggunakannya untuk menentukan peserta mana yang bermain terlebih dahulu. Kadang ia juga dipakai untuk menentukan peran dalam permainan peran, maupun dipakai sebagai sarana perjudian. Permainan ini dimainkan di berbagai belahan dunia.
                        Di kalangan anak-anak Indonesia, permainan ini juga dikenal dengan istilah "Suwit Jepang". Di Indonesia dikenal juga permainan sejenis yang dinamakan suwit.
                    </Text>
                    <Text style={style.title1}>
                        Cara Permainan
                    </Text>
                    <Text style={style.text}>
                        Terdapat tiga isyarat tangan dalam permainan ini. Batu digambarkan oleh tangan mengepal, gunting digambarkan oleh jari telunjuk dan tengah, kertas digambarkan oleh tangan terbuka. Tujuan dari permainan adalah mengalahkan lawan bermain. Aturan standar adalah batu mengalahkan gunting, gunting mengalahkan kertas, dan batu mengalahkan kertas
                    </Text>
                </View>
            </Page>
            <Page size={"A4"} style={style.page}>
                <Text style={style.title}>LEADERBOARD</Text>
                <View style={style.table}>
                    <View style={[style.row, style.bold, style.header]}>
                        <Text style={style.headers}>No</Text>
                        <Text style={style.headers}>Nama</Text>
                        <Text style={style.headers}>Score</Text>
                    </View>
                    {items.map((item, index) => (
                        <View key={index} style={style.row} wrap={false}>
                            <Text style={style.row1}>
                                <Text style={style.bold}>{index + 1}</Text>
                            </Text>
                            <Text style={style.row1}>{item.fullname}</Text>
                            <Text style={style.row1}>{item.total_score}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

const PdfReader = () => {
    const [hasMounted, sethasMounted] = useState(false);
    const [score, setScore] = useState([]);
    // console.log(score);

    const getScore = async () => {
        try {
            let respon = await axios.get(`http://localhost:4000/api/users/score`);
            setScore(respon.data.scores);
            // console.log(res.data.scores);
        } catch (e) {
            console.log(e.message);
        }
    };

    const newScore = score.filter(i => i.total_score).sort(
        (a, b) => parseFloat(b.total_score) - parseFloat(a.total_score)
    );

    const [games, setGames] = useState([]);
    // console.log(games);
    const getGames = async () => {
        try {
            let response = await axios.get(`http://localhost:4000/api/game`);
            setGames(response.data);
        } catch (e) {
            // console.log(e.message);
        }
    };

    // console.log(newScore);

    useEffect(() => {
        getScore();
        getGames();
    }, []);

    useEffect(() => {
        sethasMounted(true);
        return () => {
            sethasMounted(false);
        };
    }, []);

    return (
        <>
            {hasMounted ? (
                <div style={{ width: "100vw", height: "100vh" }}>
                    <BlobProvider document={Pdfreact(newScore)}>
                        {({ url }) => (
                            <iframe src={url} style={{ width: "100vw", height: "100vh" }} />
                        )}
                    </BlobProvider>
                </div>
            ) : null}
        </>
    );
};

const style = StyleSheet.create({
    page: {
        backgroundColor: "white"
    },
    title: {
        fontSize: "24pt",
        fontWeight: "bold",
        fontFamily: 'Times-Roman',
        textAlign: 'center',
        marginTop: 35
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    section: {
        margin: 36
    },
    section1: {
        width: "100vw",
        height: "100vh"
    },
    title1: {
        fontSize: "24pt",
        fontWeight: "bold",
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    table: {
        width: '100%',
        marginTop: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'center',
        alignSelf: 'center'
    },
    header: {
        fontSize: "18pt",
        fontWeight: "bold",
        fontFamily: 'Times-Roman',
        borderTop: 'none'
    },
    bold: {
        fontWeight: 'bold'
    },
    headers: {
        fontSize: "18pt",
        fontFamily: 'Times-Roman',
        width: '27%'
    },
    row1: {
        fontSize: "12pt",
        fontFamily: 'Times-Roman',
        width: '28%'
    },
});

export default PdfReader;
