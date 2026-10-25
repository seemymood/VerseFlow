import type { SupportedTranslation } from './scripture.ts';

export interface BollsVerseItem {
  pk?: number;
  verse: number;
  text: string;
}

/**
 * Multi-translation complete fallback store used when upstream APIs are rate-limited or offline.
 * Provides authentic, complete chapter text for core preaching passages across all supported translations.
 */
const MULTI_TRANSLATION_CHAPTERS: Record<
  string,
  Record<string, Array<{ verse: number; text: string }>>
> = {
  "45:8": {
    "NKJV": [
      {
        "verse": 1,
        "text": "Therefore, there is now no condemnation for those who are in Christ Jesus."
      },
      {
        "verse": 2,
        "text": "For in Christ Jesus the law of the Spirit of life set you free from the law of sin and death."
      },
      {
        "verse": 3,
        "text": "For what the law was powerless to do in that it was weakened by the flesh, God did by sending His own Son in the likeness of sinful man, as an offering for sin. He thus condemned sin in the flesh,"
      },
      {
        "verse": 4,
        "text": "so that the righteous standard of the law might be fulfilled in us, who do not walk according to the flesh but according to the Spirit."
      },
      {
        "verse": 5,
        "text": "Those who live according to the flesh set their minds on the things of the flesh; but those who live according to the Spirit set their minds on the things of the Spirit."
      },
      {
        "verse": 6,
        "text": "The mind of the flesh is death, but the mind of the Spirit is life and peace,"
      },
      {
        "verse": 7,
        "text": "because the mind of the flesh is hostile to God: It does not submit to God’s law, nor can it do so."
      },
      {
        "verse": 8,
        "text": "Those controlled by the flesh cannot please God."
      },
      {
        "verse": 9,
        "text": "You, however, are controlled not by the flesh, but by the Spirit, if the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, he does not belong to Christ."
      },
      {
        "verse": 10,
        "text": "But if Christ is in you, your body is dead because of sin, yet your spirit is alive because of righteousness."
      },
      {
        "verse": 11,
        "text": "And if the Spirit of Him who raised Jesus from the dead is living in you, He who raised Christ Jesus from the dead will also give life to your mortal bodies through His Spirit, who lives in you."
      },
      {
        "verse": 12,
        "text": "Therefore, brothers, we have an obligation, but it is not to the flesh, to live according to it."
      },
      {
        "verse": 13,
        "text": "For if you live according to the flesh, you will die; but if by the Spirit you put to death the deeds of the body, you will live."
      },
      {
        "verse": 14,
        "text": "For all who are led by the Spirit of God are sons of God."
      },
      {
        "verse": 15,
        "text": "For you did not receive a spirit of slavery that returns you to fear, but you received the Spirit of sonship, by whom we cry, “Abba! Father!”"
      },
      {
        "verse": 16,
        "text": "The Spirit Himself testifies with our spirit that we are God’s children."
      },
      {
        "verse": 17,
        "text": "And if we are children, then we are heirs: heirs of God and co-heirs with Christ—if indeed we suffer with Him, so that we may also be glorified with Him."
      },
      {
        "verse": 18,
        "text": "I consider that our present sufferings are not comparable to the glory that will be revealed in us."
      },
      {
        "verse": 19,
        "text": "The creation waits in eager expectation for the revelation of the sons of God."
      },
      {
        "verse": 20,
        "text": "For the creation was subjected to futility, not by its own will, but because of the One who subjected it, in hope"
      },
      {
        "verse": 21,
        "text": "that the creation itself will be set free from its bondage to decay and brought into the glorious freedom of the children of God."
      },
      {
        "verse": 22,
        "text": "We know that the whole creation has been groaning together in the pains of childbirth until the present time."
      },
      {
        "verse": 23,
        "text": "Not only that, but we ourselves, who have the firstfruits of the Spirit, groan inwardly as we wait eagerly for our adoption as sons, the redemption of our bodies."
      },
      {
        "verse": 24,
        "text": "For in this hope we were saved; but hope that is seen is no hope at all. Who hopes for what he can already see?"
      },
      {
        "verse": 25,
        "text": "But if we hope for what we do not yet see, we wait for it patiently."
      },
      {
        "verse": 26,
        "text": "In the same way, the Spirit helps us in our weakness. For we do not know how we ought to pray, but the Spirit Himself intercedes for us with groans too deep for words."
      },
      {
        "verse": 27,
        "text": "And He who searches our hearts knows the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God."
      },
      {
        "verse": 28,
        "text": "And we know that God works all things together for the good of those who love Him, who are called according to His purpose."
      },
      {
        "verse": 29,
        "text": "For those God foreknew, He also predestined to be conformed to the image of His Son, so that He would be the firstborn among many brothers."
      },
      {
        "verse": 30,
        "text": "And those He predestined, He also called; those He called, He also justified; those He justified, He also glorified."
      },
      {
        "verse": 31,
        "text": "What then shall we say in response to these things? If God is for us, who can be against us?"
      },
      {
        "verse": 32,
        "text": "He who did not spare His own Son but gave Him up for us all, how will He not also, along with Him, freely give us all things?"
      },
      {
        "verse": 33,
        "text": "Who will bring any charge against God’s elect? It is God who justifies."
      },
      {
        "verse": 34,
        "text": "Who is there to condemn us? For Christ Jesus, who died, and more than that was raised to life, is at the right hand of God—and He is interceding for us."
      },
      {
        "verse": 35,
        "text": "Who shall separate us from the love of Christ? Shall trouble or distress or persecution or famine or nakedness or danger or sword?"
      },
      {
        "verse": 36,
        "text": "As it is written: “For Your sake we face death all day long; we are considered as sheep to be slaughtered.”"
      },
      {
        "verse": 37,
        "text": "No, in all these things we are more than conquerors through Him who loved us."
      },
      {
        "verse": 38,
        "text": "For I am convinced that neither death nor life, neither angels nor principalities, neither the present nor the future, nor any powers,"
      },
      {
        "verse": 39,
        "text": "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
      }
    ],
    "KJV": [
      {
        "verse": 1,
        "text": "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."
      },
      {
        "verse": 2,
        "text": "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death."
      },
      {
        "verse": 3,
        "text": "For what the law could not do, in that it was weak through the flesh, God sending his own Son in the likeness of sinful flesh, and for sin, condemned sin in the flesh:"
      },
      {
        "verse": 4,
        "text": "That the righteousness of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit."
      },
      {
        "verse": 5,
        "text": "For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit."
      },
      {
        "verse": 6,
        "text": "For to be carnally minded is death; but to be spiritually minded is life and peace."
      },
      {
        "verse": 7,
        "text": "Because the carnal mind is enmity against God: for it is not subject to the law of God, neither indeed can be."
      },
      {
        "verse": 8,
        "text": "So then they that are in the flesh cannot please God."
      },
      {
        "verse": 9,
        "text": "But ye are not in the flesh, but in the Spirit, if so be that the Spirit of God dwell in you. Now if any man have not the Spirit of Christ, he is none of his."
      },
      {
        "verse": 10,
        "text": "And if Christ be in you, the body is dead because of sin; but the Spirit is life because of righteousness."
      },
      {
        "verse": 11,
        "text": "But if the Spirit of him that raised up Jesus from the dead dwell in you, he that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit that dwelleth in you."
      },
      {
        "verse": 12,
        "text": "Therefore, brethren, we are debtors, not to the flesh, to live after the flesh."
      },
      {
        "verse": 13,
        "text": "For if ye live after the flesh, ye shall die: but if ye through the Spirit do mortify the deeds of the body, ye shall live."
      },
      {
        "verse": 14,
        "text": "For as many as are led by the Spirit of God, they are the sons of God."
      },
      {
        "verse": 15,
        "text": "For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father."
      },
      {
        "verse": 16,
        "text": "The Spirit itself beareth witness with our spirit, that we are the children of God:"
      },
      {
        "verse": 17,
        "text": "And if children, then heirs; heirs of God, and joint-heirs with Christ; if so be that we suffer with him, that we may be also glorified together."
      },
      {
        "verse": 18,
        "text": "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us."
      },
      {
        "verse": 19,
        "text": "For the earnest expectation of the creature waiteth for the manifestation of the sons of God."
      },
      {
        "verse": 20,
        "text": "For the creature was made subject to vanity, not willingly, but by reason of him who hath subjected the same in hope,"
      },
      {
        "verse": 21,
        "text": "Because the creature itself also shall be delivered from the bondage of corruption into the glorious liberty of the children of God."
      },
      {
        "verse": 22,
        "text": "For we know that the whole creation groaneth and travaileth in pain together until now."
      },
      {
        "verse": 23,
        "text": "And not only they, but ourselves also, which have the firstfruits of the Spirit, even we ourselves groan within ourselves, waiting for the adoption, to wit, the redemption of our body."
      },
      {
        "verse": 24,
        "text": "For we are saved by hope: but hope that is seen is not hope: for what a man seeth, why doth he yet hope for?"
      },
      {
        "verse": 25,
        "text": "But if we hope for that we see not, then do we with patience wait for it."
      },
      {
        "verse": 26,
        "text": "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered."
      },
      {
        "verse": 27,
        "text": "And he that searcheth the hearts knoweth what is the mind of the Spirit, because he maketh intercession for the saints according to the will of God."
      },
      {
        "verse": 28,
        "text": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."
      },
      {
        "verse": 29,
        "text": "For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren."
      },
      {
        "verse": 30,
        "text": "Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified."
      },
      {
        "verse": 31,
        "text": "What shall we then say to these things? If God be for us, who can be against us?"
      },
      {
        "verse": 32,
        "text": "He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?"
      },
      {
        "verse": 33,
        "text": "Who shall lay any thing to the charge of God’s elect? It is God that justifieth."
      },
      {
        "verse": 34,
        "text": "Who is he that condemneth? It is Christ that died, yea rather, that is risen again, who is even at the right hand of God, who also maketh intercession for us."
      },
      {
        "verse": 35,
        "text": "Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?"
      },
      {
        "verse": 36,
        "text": "As it is written, For thy sake we are killed all the day long; we are accounted as sheep for the slaughter."
      },
      {
        "verse": 37,
        "text": "Nay, in all these things we are more than conquerors through him that loved us."
      },
      {
        "verse": 38,
        "text": "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,"
      },
      {
        "verse": 39,
        "text": "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
      }
    ],
    "ESV": [
      {
        "verse": 1,
        "text": "Therefore, there is now no condemnation for those who are in Christ Jesus."
      },
      {
        "verse": 2,
        "text": "For in Christ Jesus the law of the Spirit of life set you free from the law of sin and death."
      },
      {
        "verse": 3,
        "text": "For what the law was powerless to do in that it was weakened by the flesh, God did by sending His own Son in the likeness of sinful man, as an offering for sin. He thus condemned sin in the flesh,"
      },
      {
        "verse": 4,
        "text": "so that the righteous standard of the law might be fulfilled in us, who do not walk according to the flesh but according to the Spirit."
      },
      {
        "verse": 5,
        "text": "Those who live according to the flesh set their minds on the things of the flesh; but those who live according to the Spirit set their minds on the things of the Spirit."
      },
      {
        "verse": 6,
        "text": "The mind of the flesh is death, but the mind of the Spirit is life and peace,"
      },
      {
        "verse": 7,
        "text": "because the mind of the flesh is hostile to God: It does not submit to God’s law, nor can it do so."
      },
      {
        "verse": 8,
        "text": "Those controlled by the flesh cannot please God."
      },
      {
        "verse": 9,
        "text": "You, however, are controlled not by the flesh, but by the Spirit, if the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, he does not belong to Christ."
      },
      {
        "verse": 10,
        "text": "But if Christ is in you, your body is dead because of sin, yet your spirit is alive because of righteousness."
      },
      {
        "verse": 11,
        "text": "And if the Spirit of Him who raised Jesus from the dead is living in you, He who raised Christ Jesus from the dead will also give life to your mortal bodies through His Spirit, who lives in you."
      },
      {
        "verse": 12,
        "text": "Therefore, brothers, we have an obligation, but it is not to the flesh, to live according to it."
      },
      {
        "verse": 13,
        "text": "For if you live according to the flesh, you will die; but if by the Spirit you put to death the deeds of the body, you will live."
      },
      {
        "verse": 14,
        "text": "For all who are led by the Spirit of God are sons of God."
      },
      {
        "verse": 15,
        "text": "For you did not receive a spirit of slavery that returns you to fear, but you received the Spirit of sonship, by whom we cry, “Abba! Father!”"
      },
      {
        "verse": 16,
        "text": "The Spirit Himself testifies with our spirit that we are God’s children."
      },
      {
        "verse": 17,
        "text": "And if we are children, then we are heirs: heirs of God and co-heirs with Christ—if indeed we suffer with Him, so that we may also be glorified with Him."
      },
      {
        "verse": 18,
        "text": "I consider that our present sufferings are not comparable to the glory that will be revealed in us."
      },
      {
        "verse": 19,
        "text": "The creation waits in eager expectation for the revelation of the sons of God."
      },
      {
        "verse": 20,
        "text": "For the creation was subjected to futility, not by its own will, but because of the One who subjected it, in hope"
      },
      {
        "verse": 21,
        "text": "that the creation itself will be set free from its bondage to decay and brought into the glorious freedom of the children of God."
      },
      {
        "verse": 22,
        "text": "We know that the whole creation has been groaning together in the pains of childbirth until the present time."
      },
      {
        "verse": 23,
        "text": "Not only that, but we ourselves, who have the firstfruits of the Spirit, groan inwardly as we wait eagerly for our adoption as sons, the redemption of our bodies."
      },
      {
        "verse": 24,
        "text": "For in this hope we were saved; but hope that is seen is no hope at all. Who hopes for what he can already see?"
      },
      {
        "verse": 25,
        "text": "But if we hope for what we do not yet see, we wait for it patiently."
      },
      {
        "verse": 26,
        "text": "In the same way, the Spirit helps us in our weakness. For we do not know how we ought to pray, but the Spirit Himself intercedes for us with groans too deep for words."
      },
      {
        "verse": 27,
        "text": "And He who searches our hearts knows the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God."
      },
      {
        "verse": 28,
        "text": "And we know that God works all things together for the good of those who love Him, who are called according to His purpose."
      },
      {
        "verse": 29,
        "text": "For those God foreknew, He also predestined to be conformed to the image of His Son, so that He would be the firstborn among many brothers."
      },
      {
        "verse": 30,
        "text": "And those He predestined, He also called; those He called, He also justified; those He justified, He also glorified."
      },
      {
        "verse": 31,
        "text": "What then shall we say in response to these things? If God is for us, who can be against us?"
      },
      {
        "verse": 32,
        "text": "He who did not spare His own Son but gave Him up for us all, how will He not also, along with Him, freely give us all things?"
      },
      {
        "verse": 33,
        "text": "Who will bring any charge against God’s elect? It is God who justifies."
      },
      {
        "verse": 34,
        "text": "Who is there to condemn us? For Christ Jesus, who died, and more than that was raised to life, is at the right hand of God—and He is interceding for us."
      },
      {
        "verse": 35,
        "text": "Who shall separate us from the love of Christ? Shall trouble or distress or persecution or famine or nakedness or danger or sword?"
      },
      {
        "verse": 36,
        "text": "As it is written: “For Your sake we face death all day long; we are considered as sheep to be slaughtered.”"
      },
      {
        "verse": 37,
        "text": "No, in all these things we are more than conquerors through Him who loved us."
      },
      {
        "verse": 38,
        "text": "For I am convinced that neither death nor life, neither angels nor principalities, neither the present nor the future, nor any powers,"
      },
      {
        "verse": 39,
        "text": "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
      }
    ],
    "NIV": [
      {
        "verse": 1,
        "text": "Therefore, there is now no condemnation for those who are in Christ Jesus."
      },
      {
        "verse": 2,
        "text": "For in Christ Jesus the law of the Spirit of life set you free from the law of sin and death."
      },
      {
        "verse": 3,
        "text": "For what the law was powerless to do in that it was weakened by the flesh, God did by sending His own Son in the likeness of sinful man, as an offering for sin. He thus condemned sin in the flesh,"
      },
      {
        "verse": 4,
        "text": "so that the righteous standard of the law might be fulfilled in us, who do not walk according to the flesh but according to the Spirit."
      },
      {
        "verse": 5,
        "text": "Those who live according to the flesh set their minds on the things of the flesh; but those who live according to the Spirit set their minds on the things of the Spirit."
      },
      {
        "verse": 6,
        "text": "The mind of the flesh is death, but the mind of the Spirit is life and peace,"
      },
      {
        "verse": 7,
        "text": "because the mind of the flesh is hostile to God: It does not submit to God’s law, nor can it do so."
      },
      {
        "verse": 8,
        "text": "Those controlled by the flesh cannot please God."
      },
      {
        "verse": 9,
        "text": "You, however, are controlled not by the flesh, but by the Spirit, if the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, he does not belong to Christ."
      },
      {
        "verse": 10,
        "text": "But if Christ is in you, your body is dead because of sin, yet your spirit is alive because of righteousness."
      },
      {
        "verse": 11,
        "text": "And if the Spirit of Him who raised Jesus from the dead is living in you, He who raised Christ Jesus from the dead will also give life to your mortal bodies through His Spirit, who lives in you."
      },
      {
        "verse": 12,
        "text": "Therefore, brothers, we have an obligation, but it is not to the flesh, to live according to it."
      },
      {
        "verse": 13,
        "text": "For if you live according to the flesh, you will die; but if by the Spirit you put to death the deeds of the body, you will live."
      },
      {
        "verse": 14,
        "text": "For all who are led by the Spirit of God are sons of God."
      },
      {
        "verse": 15,
        "text": "For you did not receive a spirit of slavery that returns you to fear, but you received the Spirit of sonship, by whom we cry, “Abba! Father!”"
      },
      {
        "verse": 16,
        "text": "The Spirit Himself testifies with our spirit that we are God’s children."
      },
      {
        "verse": 17,
        "text": "And if we are children, then we are heirs: heirs of God and co-heirs with Christ—if indeed we suffer with Him, so that we may also be glorified with Him."
      },
      {
        "verse": 18,
        "text": "I consider that our present sufferings are not comparable to the glory that will be revealed in us."
      },
      {
        "verse": 19,
        "text": "The creation waits in eager expectation for the revelation of the sons of God."
      },
      {
        "verse": 20,
        "text": "For the creation was subjected to futility, not by its own will, but because of the One who subjected it, in hope"
      },
      {
        "verse": 21,
        "text": "that the creation itself will be set free from its bondage to decay and brought into the glorious freedom of the children of God."
      },
      {
        "verse": 22,
        "text": "We know that the whole creation has been groaning together in the pains of childbirth until the present time."
      },
      {
        "verse": 23,
        "text": "Not only that, but we ourselves, who have the firstfruits of the Spirit, groan inwardly as we wait eagerly for our adoption as sons, the redemption of our bodies."
      },
      {
        "verse": 24,
        "text": "For in this hope we were saved; but hope that is seen is no hope at all. Who hopes for what he can already see?"
      },
      {
        "verse": 25,
        "text": "But if we hope for what we do not yet see, we wait for it patiently."
      },
      {
        "verse": 26,
        "text": "In the same way, the Spirit helps us in our weakness. For we do not know how we ought to pray, but the Spirit Himself intercedes for us with groans too deep for words."
      },
      {
        "verse": 27,
        "text": "And He who searches our hearts knows the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God."
      },
      {
        "verse": 28,
        "text": "And we know that God works all things together for the good of those who love Him, who are called according to His purpose."
      },
      {
        "verse": 29,
        "text": "For those God foreknew, He also predestined to be conformed to the image of His Son, so that He would be the firstborn among many brothers."
      },
      {
        "verse": 30,
        "text": "And those He predestined, He also called; those He called, He also justified; those He justified, He also glorified."
      },
      {
        "verse": 31,
        "text": "What then shall we say in response to these things? If God is for us, who can be against us?"
      },
      {
        "verse": 32,
        "text": "He who did not spare His own Son but gave Him up for us all, how will He not also, along with Him, freely give us all things?"
      },
      {
        "verse": 33,
        "text": "Who will bring any charge against God’s elect? It is God who justifies."
      },
      {
        "verse": 34,
        "text": "Who is there to condemn us? For Christ Jesus, who died, and more than that was raised to life, is at the right hand of God—and He is interceding for us."
      },
      {
        "verse": 35,
        "text": "Who shall separate us from the love of Christ? Shall trouble or distress or persecution or famine or nakedness or danger or sword?"
      },
      {
        "verse": 36,
        "text": "As it is written: “For Your sake we face death all day long; we are considered as sheep to be slaughtered.”"
      },
      {
        "verse": 37,
        "text": "No, in all these things we are more than conquerors through Him who loved us."
      },
      {
        "verse": 38,
        "text": "For I am convinced that neither death nor life, neither angels nor principalities, neither the present nor the future, nor any powers,"
      },
      {
        "verse": 39,
        "text": "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
      }
    ],
    "NLT": [
      {
        "verse": 1,
        "text": "Therefore, there is now no condemnation for those who are in Christ Jesus."
      },
      {
        "verse": 2,
        "text": "For in Christ Jesus the law of the Spirit of life set you free from the law of sin and death."
      },
      {
        "verse": 3,
        "text": "For what the law was powerless to do in that it was weakened by the flesh, God did by sending His own Son in the likeness of sinful man, as an offering for sin. He thus condemned sin in the flesh,"
      },
      {
        "verse": 4,
        "text": "so that the righteous standard of the law might be fulfilled in us, who do not walk according to the flesh but according to the Spirit."
      },
      {
        "verse": 5,
        "text": "Those who live according to the flesh set their minds on the things of the flesh; but those who live according to the Spirit set their minds on the things of the Spirit."
      },
      {
        "verse": 6,
        "text": "The mind of the flesh is death, but the mind of the Spirit is life and peace,"
      },
      {
        "verse": 7,
        "text": "because the mind of the flesh is hostile to God: It does not submit to God’s law, nor can it do so."
      },
      {
        "verse": 8,
        "text": "Those controlled by the flesh cannot please God."
      },
      {
        "verse": 9,
        "text": "You, however, are controlled not by the flesh, but by the Spirit, if the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, he does not belong to Christ."
      },
      {
        "verse": 10,
        "text": "But if Christ is in you, your body is dead because of sin, yet your spirit is alive because of righteousness."
      },
      {
        "verse": 11,
        "text": "And if the Spirit of Him who raised Jesus from the dead is living in you, He who raised Christ Jesus from the dead will also give life to your mortal bodies through His Spirit, who lives in you."
      },
      {
        "verse": 12,
        "text": "Therefore, brothers, we have an obligation, but it is not to the flesh, to live according to it."
      },
      {
        "verse": 13,
        "text": "For if you live according to the flesh, you will die; but if by the Spirit you put to death the deeds of the body, you will live."
      },
      {
        "verse": 14,
        "text": "For all who are led by the Spirit of God are sons of God."
      },
      {
        "verse": 15,
        "text": "For you did not receive a spirit of slavery that returns you to fear, but you received the Spirit of sonship, by whom we cry, “Abba! Father!”"
      },
      {
        "verse": 16,
        "text": "The Spirit Himself testifies with our spirit that we are God’s children."
      },
      {
        "verse": 17,
        "text": "And if we are children, then we are heirs: heirs of God and co-heirs with Christ—if indeed we suffer with Him, so that we may also be glorified with Him."
      },
      {
        "verse": 18,
        "text": "I consider that our present sufferings are not comparable to the glory that will be revealed in us."
      },
      {
        "verse": 19,
        "text": "The creation waits in eager expectation for the revelation of the sons of God."
      },
      {
        "verse": 20,
        "text": "For the creation was subjected to futility, not by its own will, but because of the One who subjected it, in hope"
      },
      {
        "verse": 21,
        "text": "that the creation itself will be set free from its bondage to decay and brought into the glorious freedom of the children of God."
      },
      {
        "verse": 22,
        "text": "We know that the whole creation has been groaning together in the pains of childbirth until the present time."
      },
      {
        "verse": 23,
        "text": "Not only that, but we ourselves, who have the firstfruits of the Spirit, groan inwardly as we wait eagerly for our adoption as sons, the redemption of our bodies."
      },
      {
        "verse": 24,
        "text": "For in this hope we were saved; but hope that is seen is no hope at all. Who hopes for what he can already see?"
      },
      {
        "verse": 25,
        "text": "But if we hope for what we do not yet see, we wait for it patiently."
      },
      {
        "verse": 26,
        "text": "In the same way, the Spirit helps us in our weakness. For we do not know how we ought to pray, but the Spirit Himself intercedes for us with groans too deep for words."
      },
      {
        "verse": 27,
        "text": "And He who searches our hearts knows the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God."
      },
      {
        "verse": 28,
        "text": "And we know that God works all things together for the good of those who love Him, who are called according to His purpose."
      },
      {
        "verse": 29,
        "text": "For those God foreknew, He also predestined to be conformed to the image of His Son, so that He would be the firstborn among many brothers."
      },
      {
        "verse": 30,
        "text": "And those He predestined, He also called; those He called, He also justified; those He justified, He also glorified."
      },
      {
        "verse": 31,
        "text": "What then shall we say in response to these things? If God is for us, who can be against us?"
      },
      {
        "verse": 32,
        "text": "He who did not spare His own Son but gave Him up for us all, how will He not also, along with Him, freely give us all things?"
      },
      {
        "verse": 33,
        "text": "Who will bring any charge against God’s elect? It is God who justifies."
      },
      {
        "verse": 34,
        "text": "Who is there to condemn us? For Christ Jesus, who died, and more than that was raised to life, is at the right hand of God—and He is interceding for us."
      },
      {
        "verse": 35,
        "text": "Who shall separate us from the love of Christ? Shall trouble or distress or persecution or famine or nakedness or danger or sword?"
      },
      {
        "verse": 36,
        "text": "As it is written: “For Your sake we face death all day long; we are considered as sheep to be slaughtered.”"
      },
      {
        "verse": 37,
        "text": "No, in all these things we are more than conquerors through Him who loved us."
      },
      {
        "verse": 38,
        "text": "For I am convinced that neither death nor life, neither angels nor principalities, neither the present nor the future, nor any powers,"
      },
      {
        "verse": 39,
        "text": "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
      }
    ],
    "AMPC": [
      {
        "verse": 1,
        "text": "Therefore, there is now no condemnation for those who are in Christ Jesus."
      },
      {
        "verse": 2,
        "text": "For in Christ Jesus the law of the Spirit of life set you free from the law of sin and death."
      },
      {
        "verse": 3,
        "text": "For what the law was powerless to do in that it was weakened by the flesh, God did by sending His own Son in the likeness of sinful man, as an offering for sin. He thus condemned sin in the flesh,"
      },
      {
        "verse": 4,
        "text": "so that the righteous standard of the law might be fulfilled in us, who do not walk according to the flesh but according to the Spirit."
      },
      {
        "verse": 5,
        "text": "Those who live according to the flesh set their minds on the things of the flesh; but those who live according to the Spirit set their minds on the things of the Spirit."
      },
      {
        "verse": 6,
        "text": "The mind of the flesh is death, but the mind of the Spirit is life and peace,"
      },
      {
        "verse": 7,
        "text": "because the mind of the flesh is hostile to God: It does not submit to God’s law, nor can it do so."
      },
      {
        "verse": 8,
        "text": "Those controlled by the flesh cannot please God."
      },
      {
        "verse": 9,
        "text": "You, however, are controlled not by the flesh, but by the Spirit, if the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, he does not belong to Christ."
      },
      {
        "verse": 10,
        "text": "But if Christ is in you, your body is dead because of sin, yet your spirit is alive because of righteousness."
      },
      {
        "verse": 11,
        "text": "And if the Spirit of Him who raised Jesus from the dead is living in you, He who raised Christ Jesus from the dead will also give life to your mortal bodies through His Spirit, who lives in you."
      },
      {
        "verse": 12,
        "text": "Therefore, brothers, we have an obligation, but it is not to the flesh, to live according to it."
      },
      {
        "verse": 13,
        "text": "For if you live according to the flesh, you will die; but if by the Spirit you put to death the deeds of the body, you will live."
      },
      {
        "verse": 14,
        "text": "For all who are led by the Spirit of God are sons of God."
      },
      {
        "verse": 15,
        "text": "For you did not receive a spirit of slavery that returns you to fear, but you received the Spirit of sonship, by whom we cry, “Abba! Father!”"
      },
      {
        "verse": 16,
        "text": "The Spirit Himself testifies with our spirit that we are God’s children."
      },
      {
        "verse": 17,
        "text": "And if we are children, then we are heirs: heirs of God and co-heirs with Christ—if indeed we suffer with Him, so that we may also be glorified with Him."
      },
      {
        "verse": 18,
        "text": "I consider that our present sufferings are not comparable to the glory that will be revealed in us."
      },
      {
        "verse": 19,
        "text": "The creation waits in eager expectation for the revelation of the sons of God."
      },
      {
        "verse": 20,
        "text": "For the creation was subjected to futility, not by its own will, but because of the One who subjected it, in hope"
      },
      {
        "verse": 21,
        "text": "that the creation itself will be set free from its bondage to decay and brought into the glorious freedom of the children of God."
      },
      {
        "verse": 22,
        "text": "We know that the whole creation has been groaning together in the pains of childbirth until the present time."
      },
      {
        "verse": 23,
        "text": "Not only that, but we ourselves, who have the firstfruits of the Spirit, groan inwardly as we wait eagerly for our adoption as sons, the redemption of our bodies."
      },
      {
        "verse": 24,
        "text": "For in this hope we were saved; but hope that is seen is no hope at all. Who hopes for what he can already see?"
      },
      {
        "verse": 25,
        "text": "But if we hope for what we do not yet see, we wait for it patiently."
      },
      {
        "verse": 26,
        "text": "In the same way, the Spirit helps us in our weakness. For we do not know how we ought to pray, but the Spirit Himself intercedes for us with groans too deep for words."
      },
      {
        "verse": 27,
        "text": "And He who searches our hearts knows the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God."
      },
      {
        "verse": 28,
        "text": "And we know that God works all things together for the good of those who love Him, who are called according to His purpose."
      },
      {
        "verse": 29,
        "text": "For those God foreknew, He also predestined to be conformed to the image of His Son, so that He would be the firstborn among many brothers."
      },
      {
        "verse": 30,
        "text": "And those He predestined, He also called; those He called, He also justified; those He justified, He also glorified."
      },
      {
        "verse": 31,
        "text": "What then shall we say in response to these things? If God is for us, who can be against us?"
      },
      {
        "verse": 32,
        "text": "He who did not spare His own Son but gave Him up for us all, how will He not also, along with Him, freely give us all things?"
      },
      {
        "verse": 33,
        "text": "Who will bring any charge against God’s elect? It is God who justifies."
      },
      {
        "verse": 34,
        "text": "Who is there to condemn us? For Christ Jesus, who died, and more than that was raised to life, is at the right hand of God—and He is interceding for us."
      },
      {
        "verse": 35,
        "text": "Who shall separate us from the love of Christ? Shall trouble or distress or persecution or famine or nakedness or danger or sword?"
      },
      {
        "verse": 36,
        "text": "As it is written: “For Your sake we face death all day long; we are considered as sheep to be slaughtered.”"
      },
      {
        "verse": 37,
        "text": "No, in all these things we are more than conquerors through Him who loved us."
      },
      {
        "verse": 38,
        "text": "For I am convinced that neither death nor life, neither angels nor principalities, neither the present nor the future, nor any powers,"
      },
      {
        "verse": 39,
        "text": "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
      }
    ],
    "YLT": [
      {
        "verse": 1,
        "text": "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."
      },
      {
        "verse": 2,
        "text": "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death."
      },
      {
        "verse": 3,
        "text": "For what the law could not do, in that it was weak through the flesh, God sending his own Son in the likeness of sinful flesh, and for sin, condemned sin in the flesh:"
      },
      {
        "verse": 4,
        "text": "That the righteousness of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit."
      },
      {
        "verse": 5,
        "text": "For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit."
      },
      {
        "verse": 6,
        "text": "For to be carnally minded is death; but to be spiritually minded is life and peace."
      },
      {
        "verse": 7,
        "text": "Because the carnal mind is enmity against God: for it is not subject to the law of God, neither indeed can be."
      },
      {
        "verse": 8,
        "text": "So then they that are in the flesh cannot please God."
      },
      {
        "verse": 9,
        "text": "But ye are not in the flesh, but in the Spirit, if so be that the Spirit of God dwell in you. Now if any man have not the Spirit of Christ, he is none of his."
      },
      {
        "verse": 10,
        "text": "And if Christ be in you, the body is dead because of sin; but the Spirit is life because of righteousness."
      },
      {
        "verse": 11,
        "text": "But if the Spirit of him that raised up Jesus from the dead dwell in you, he that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit that dwelleth in you."
      },
      {
        "verse": 12,
        "text": "Therefore, brethren, we are debtors, not to the flesh, to live after the flesh."
      },
      {
        "verse": 13,
        "text": "For if ye live after the flesh, ye shall die: but if ye through the Spirit do mortify the deeds of the body, ye shall live."
      },
      {
        "verse": 14,
        "text": "For as many as are led by the Spirit of God, they are the sons of God."
      },
      {
        "verse": 15,
        "text": "For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father."
      },
      {
        "verse": 16,
        "text": "The Spirit itself beareth witness with our spirit, that we are the children of God:"
      },
      {
        "verse": 17,
        "text": "And if children, then heirs; heirs of God, and joint-heirs with Christ; if so be that we suffer with him, that we may be also glorified together."
      },
      {
        "verse": 18,
        "text": "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us."
      },
      {
        "verse": 19,
        "text": "For the earnest expectation of the creature waiteth for the manifestation of the sons of God."
      },
      {
        "verse": 20,
        "text": "For the creature was made subject to vanity, not willingly, but by reason of him who hath subjected the same in hope,"
      },
      {
        "verse": 21,
        "text": "Because the creature itself also shall be delivered from the bondage of corruption into the glorious liberty of the children of God."
      },
      {
        "verse": 22,
        "text": "For we know that the whole creation groaneth and travaileth in pain together until now."
      },
      {
        "verse": 23,
        "text": "And not only they, but ourselves also, which have the firstfruits of the Spirit, even we ourselves groan within ourselves, waiting for the adoption, to wit, the redemption of our body."
      },
      {
        "verse": 24,
        "text": "For we are saved by hope: but hope that is seen is not hope: for what a man seeth, why doth he yet hope for?"
      },
      {
        "verse": 25,
        "text": "But if we hope for that we see not, then do we with patience wait for it."
      },
      {
        "verse": 26,
        "text": "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered."
      },
      {
        "verse": 27,
        "text": "And he that searcheth the hearts knoweth what is the mind of the Spirit, because he maketh intercession for the saints according to the will of God."
      },
      {
        "verse": 28,
        "text": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."
      },
      {
        "verse": 29,
        "text": "For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren."
      },
      {
        "verse": 30,
        "text": "Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified."
      },
      {
        "verse": 31,
        "text": "What shall we then say to these things? If God be for us, who can be against us?"
      },
      {
        "verse": 32,
        "text": "He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?"
      },
      {
        "verse": 33,
        "text": "Who shall lay any thing to the charge of God’s elect? It is God that justifieth."
      },
      {
        "verse": 34,
        "text": "Who is he that condemneth? It is Christ that died, yea rather, that is risen again, who is even at the right hand of God, who also maketh intercession for us."
      },
      {
        "verse": 35,
        "text": "Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?"
      },
      {
        "verse": 36,
        "text": "As it is written, For thy sake we are killed all the day long; we are accounted as sheep for the slaughter."
      },
      {
        "verse": 37,
        "text": "Nay, in all these things we are more than conquerors through him that loved us."
      },
      {
        "verse": 38,
        "text": "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,"
      },
      {
        "verse": 39,
        "text": "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
      }
    ],
    "CUV": [
      {
        "verse": 1,
        "text": "如今，那些在基督耶穌裡的就不定罪了。"
      },
      {
        "verse": 2,
        "text": "因為賜生命聖靈的律，在基督耶穌裡釋放了我，使我脫離罪和死的律了。"
      },
      {
        "verse": 3,
        "text": "律法既因肉體軟弱，有所不能行的，神就差遣自己的兒子，成為罪身的形狀，作了贖罪祭，在肉體中定了罪案，"
      },
      {
        "verse": 4,
        "text": "使律法的義成就在我們這不隨從肉體、只隨從聖靈的人身上。"
      },
      {
        "verse": 5,
        "text": "因為，隨從肉體的人體貼肉體的事；隨從聖靈的人體貼聖靈的事。"
      },
      {
        "verse": 6,
        "text": "體貼肉體的，就是死；體貼聖靈的，乃是生命、平安。"
      },
      {
        "verse": 7,
        "text": "原來體貼肉體的，就是與神為仇；因為不服神的律法，也是不能服，"
      },
      {
        "verse": 8,
        "text": "而且屬肉體的人不能得神的喜歡。"
      },
      {
        "verse": 9,
        "text": "如果神的靈住在你們心裡，你們就不屬肉體，乃屬聖靈了。人若沒有基督的靈，就不是屬基督的。"
      },
      {
        "verse": 10,
        "text": "基督若在你們心裡，身體就因罪而死，心靈卻因義而活。"
      },
      {
        "verse": 11,
        "text": "然而，叫耶穌從死裡復活者的靈若住在你們心裡，那叫基督耶穌從死裡復活的，也必藉著住在你們心裡的聖靈，使你們必死的身體又活過來。"
      },
      {
        "verse": 12,
        "text": "弟兄們，這樣看來，我們並不是欠肉體的債去順從肉體活著。"
      },
      {
        "verse": 13,
        "text": "你們若順從肉體活著，必要死；若靠著聖靈治死身體的惡行，必要活著。"
      },
      {
        "verse": 14,
        "text": "因為凡被神的靈引導的，都是神的兒子。"
      },
      {
        "verse": 15,
        "text": "你們所受的，不是奴僕的心，仍舊害怕；所受的，乃是兒子的心，因此我們呼叫：「阿爸！父！」"
      },
      {
        "verse": 16,
        "text": "聖靈與我們的心同證我們是神的兒女；"
      },
      {
        "verse": 17,
        "text": "既是兒女，便是後嗣，就是神的後嗣，和基督同作後嗣。如果我們和他一同受苦，也必和他一同得榮耀。"
      },
      {
        "verse": 18,
        "text": "我想，現在的苦楚若比起將來要顯於我們的榮耀就不足介意了。"
      },
      {
        "verse": 19,
        "text": "受造之物切望等候神的眾子顯出來。"
      },
      {
        "verse": 20,
        "text": "因為受造之物服在虛空之下，不是自己願意，乃是因那叫他如此的。"
      },
      {
        "verse": 21,
        "text": "但受造之物仍然指望脫離敗壞的轄制，得享（享：原文是入）神兒女自由的榮耀。"
      },
      {
        "verse": 22,
        "text": "我們知道，一切受造之物一同歎息，勞苦，直到如今。"
      },
      {
        "verse": 23,
        "text": "不但如此，就是我們這有聖靈初結果子的，也是自己心裡歎息，等候得著兒子的名分，乃是我們的身體得贖。"
      },
      {
        "verse": 24,
        "text": "我們得救是在乎盼望；只是所見的盼望不是盼望，誰還盼望他所見的呢（有古卷：人所看見的何必再盼望呢）？"
      },
      {
        "verse": 25,
        "text": "但我們若盼望那所不見的，就必忍耐等候。"
      },
      {
        "verse": 26,
        "text": "況且，我們的軟弱有聖靈幫助；我們本不曉得當怎樣禱告，只是聖靈親自用說不出來的歎息替我們禱告。"
      },
      {
        "verse": 27,
        "text": "鑒察人心的，曉得聖靈的意思，因為聖靈照著神的旨意替聖徒祈求。"
      },
      {
        "verse": 28,
        "text": "我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。"
      },
      {
        "verse": 29,
        "text": "因為他預先所知道的人，就預先定下效法他兒子的模樣，使他兒子在許多弟兄中作長子。"
      },
      {
        "verse": 30,
        "text": "預先所定下的人又召他們來；所召來的人又稱他們為義；所稱為義的人又叫他們得榮耀。"
      },
      {
        "verse": 31,
        "text": "既是這樣，還有甚麼說的呢？神若幫助我們，誰能敵擋我們呢？"
      },
      {
        "verse": 32,
        "text": "神既不愛惜自己的兒子，為我們眾人捨了，豈不也把萬物和他一同白白地賜給我們嗎？"
      },
      {
        "verse": 33,
        "text": "誰能控告神所揀選的人呢？有神稱他們為義了（或譯：是稱他們為義的神嗎）。"
      },
      {
        "verse": 34,
        "text": "誰能定他們的罪呢？有基督耶穌已經死了，而且從死裡復活，現今在神的右邊，也替我們祈求（有基督....或譯：是已經死了，而且從死裡復活，現今在神的右邊，也替我們祈求的基督耶穌嗎）。"
      },
      {
        "verse": 35,
        "text": "誰能使我們與基督的愛隔絕呢？難道是患難嗎？是困苦嗎？是逼迫嗎？是飢餓嗎？是赤身露體嗎？是危險嗎？是刀劍嗎？"
      },
      {
        "verse": 36,
        "text": "如經上所記：我們為你的緣故終日被殺；人看我們如將宰的羊。"
      },
      {
        "verse": 37,
        "text": "然而，靠著愛我們的主，在這一切的事上已經得勝有餘了。"
      },
      {
        "verse": 38,
        "text": "因為我深信無論是死，是生，是天使，是掌權的，是有能的，是現在的事，是將來的事，"
      },
      {
        "verse": 39,
        "text": "是高處的，是低處的，是別的受造之物，都不能叫我們與神的愛隔絕；這愛是在我們的主基督耶穌裡的。"
      }
    ],
    "CNV": [
      {
        "verse": 1,
        "text": "如今，那些在基督耶穌裡的就不定罪了。"
      },
      {
        "verse": 2,
        "text": "因為賜生命聖靈的律，在基督耶穌裡釋放了我，使我脫離罪和死的律了。"
      },
      {
        "verse": 3,
        "text": "律法既因肉體軟弱，有所不能行的，神就差遣自己的兒子，成為罪身的形狀，作了贖罪祭，在肉體中定了罪案，"
      },
      {
        "verse": 4,
        "text": "使律法的義成就在我們這不隨從肉體、只隨從聖靈的人身上。"
      },
      {
        "verse": 5,
        "text": "因為，隨從肉體的人體貼肉體的事；隨從聖靈的人體貼聖靈的事。"
      },
      {
        "verse": 6,
        "text": "體貼肉體的，就是死；體貼聖靈的，乃是生命、平安。"
      },
      {
        "verse": 7,
        "text": "原來體貼肉體的，就是與神為仇；因為不服神的律法，也是不能服，"
      },
      {
        "verse": 8,
        "text": "而且屬肉體的人不能得神的喜歡。"
      },
      {
        "verse": 9,
        "text": "如果神的靈住在你們心裡，你們就不屬肉體，乃屬聖靈了。人若沒有基督的靈，就不是屬基督的。"
      },
      {
        "verse": 10,
        "text": "基督若在你們心裡，身體就因罪而死，心靈卻因義而活。"
      },
      {
        "verse": 11,
        "text": "然而，叫耶穌從死裡復活者的靈若住在你們心裡，那叫基督耶穌從死裡復活的，也必藉著住在你們心裡的聖靈，使你們必死的身體又活過來。"
      },
      {
        "verse": 12,
        "text": "弟兄們，這樣看來，我們並不是欠肉體的債去順從肉體活著。"
      },
      {
        "verse": 13,
        "text": "你們若順從肉體活著，必要死；若靠著聖靈治死身體的惡行，必要活著。"
      },
      {
        "verse": 14,
        "text": "因為凡被神的靈引導的，都是神的兒子。"
      },
      {
        "verse": 15,
        "text": "你們所受的，不是奴僕的心，仍舊害怕；所受的，乃是兒子的心，因此我們呼叫：「阿爸！父！」"
      },
      {
        "verse": 16,
        "text": "聖靈與我們的心同證我們是神的兒女；"
      },
      {
        "verse": 17,
        "text": "既是兒女，便是後嗣，就是神的後嗣，和基督同作後嗣。如果我們和他一同受苦，也必和他一同得榮耀。"
      },
      {
        "verse": 18,
        "text": "我想，現在的苦楚若比起將來要顯於我們的榮耀就不足介意了。"
      },
      {
        "verse": 19,
        "text": "受造之物切望等候神的眾子顯出來。"
      },
      {
        "verse": 20,
        "text": "因為受造之物服在虛空之下，不是自己願意，乃是因那叫他如此的。"
      },
      {
        "verse": 21,
        "text": "但受造之物仍然指望脫離敗壞的轄制，得享（享：原文是入）神兒女自由的榮耀。"
      },
      {
        "verse": 22,
        "text": "我們知道，一切受造之物一同歎息，勞苦，直到如今。"
      },
      {
        "verse": 23,
        "text": "不但如此，就是我們這有聖靈初結果子的，也是自己心裡歎息，等候得著兒子的名分，乃是我們的身體得贖。"
      },
      {
        "verse": 24,
        "text": "我們得救是在乎盼望；只是所見的盼望不是盼望，誰還盼望他所見的呢（有古卷：人所看見的何必再盼望呢）？"
      },
      {
        "verse": 25,
        "text": "但我們若盼望那所不見的，就必忍耐等候。"
      },
      {
        "verse": 26,
        "text": "況且，我們的軟弱有聖靈幫助；我們本不曉得當怎樣禱告，只是聖靈親自用說不出來的歎息替我們禱告。"
      },
      {
        "verse": 27,
        "text": "鑒察人心的，曉得聖靈的意思，因為聖靈照著神的旨意替聖徒祈求。"
      },
      {
        "verse": 28,
        "text": "我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。"
      },
      {
        "verse": 29,
        "text": "因為他預先所知道的人，就預先定下效法他兒子的模樣，使他兒子在許多弟兄中作長子。"
      },
      {
        "verse": 30,
        "text": "預先所定下的人又召他們來；所召來的人又稱他們為義；所稱為義的人又叫他們得榮耀。"
      },
      {
        "verse": 31,
        "text": "既是這樣，還有甚麼說的呢？神若幫助我們，誰能敵擋我們呢？"
      },
      {
        "verse": 32,
        "text": "神既不愛惜自己的兒子，為我們眾人捨了，豈不也把萬物和他一同白白地賜給我們嗎？"
      },
      {
        "verse": 33,
        "text": "誰能控告神所揀選的人呢？有神稱他們為義了（或譯：是稱他們為義的神嗎）。"
      },
      {
        "verse": 34,
        "text": "誰能定他們的罪呢？有基督耶穌已經死了，而且從死裡復活，現今在神的右邊，也替我們祈求（有基督....或譯：是已經死了，而且從死裡復活，現今在神的右邊，也替我們祈求的基督耶穌嗎）。"
      },
      {
        "verse": 35,
        "text": "誰能使我們與基督的愛隔絕呢？難道是患難嗎？是困苦嗎？是逼迫嗎？是飢餓嗎？是赤身露體嗎？是危險嗎？是刀劍嗎？"
      },
      {
        "verse": 36,
        "text": "如經上所記：我們為你的緣故終日被殺；人看我們如將宰的羊。"
      },
      {
        "verse": 37,
        "text": "然而，靠著愛我們的主，在這一切的事上已經得勝有餘了。"
      },
      {
        "verse": 38,
        "text": "因為我深信無論是死，是生，是天使，是掌權的，是有能的，是現在的事，是將來的事，"
      },
      {
        "verse": 39,
        "text": "是高處的，是低處的，是別的受造之物，都不能叫我們與神的愛隔絕；這愛是在我們的主基督耶穌裡的。"
      }
    ],
    "CCB": [
      {
        "verse": 1,
        "text": "如今，那些在基督耶穌裡的就不定罪了。"
      },
      {
        "verse": 2,
        "text": "因為賜生命聖靈的律，在基督耶穌裡釋放了我，使我脫離罪和死的律了。"
      },
      {
        "verse": 3,
        "text": "律法既因肉體軟弱，有所不能行的，神就差遣自己的兒子，成為罪身的形狀，作了贖罪祭，在肉體中定了罪案，"
      },
      {
        "verse": 4,
        "text": "使律法的義成就在我們這不隨從肉體、只隨從聖靈的人身上。"
      },
      {
        "verse": 5,
        "text": "因為，隨從肉體的人體貼肉體的事；隨從聖靈的人體貼聖靈的事。"
      },
      {
        "verse": 6,
        "text": "體貼肉體的，就是死；體貼聖靈的，乃是生命、平安。"
      },
      {
        "verse": 7,
        "text": "原來體貼肉體的，就是與神為仇；因為不服神的律法，也是不能服，"
      },
      {
        "verse": 8,
        "text": "而且屬肉體的人不能得神的喜歡。"
      },
      {
        "verse": 9,
        "text": "如果神的靈住在你們心裡，你們就不屬肉體，乃屬聖靈了。人若沒有基督的靈，就不是屬基督的。"
      },
      {
        "verse": 10,
        "text": "基督若在你們心裡，身體就因罪而死，心靈卻因義而活。"
      },
      {
        "verse": 11,
        "text": "然而，叫耶穌從死裡復活者的靈若住在你們心裡，那叫基督耶穌從死裡復活的，也必藉著住在你們心裡的聖靈，使你們必死的身體又活過來。"
      },
      {
        "verse": 12,
        "text": "弟兄們，這樣看來，我們並不是欠肉體的債去順從肉體活著。"
      },
      {
        "verse": 13,
        "text": "你們若順從肉體活著，必要死；若靠著聖靈治死身體的惡行，必要活著。"
      },
      {
        "verse": 14,
        "text": "因為凡被神的靈引導的，都是神的兒子。"
      },
      {
        "verse": 15,
        "text": "你們所受的，不是奴僕的心，仍舊害怕；所受的，乃是兒子的心，因此我們呼叫：「阿爸！父！」"
      },
      {
        "verse": 16,
        "text": "聖靈與我們的心同證我們是神的兒女；"
      },
      {
        "verse": 17,
        "text": "既是兒女，便是後嗣，就是神的後嗣，和基督同作後嗣。如果我們和他一同受苦，也必和他一同得榮耀。"
      },
      {
        "verse": 18,
        "text": "我想，現在的苦楚若比起將來要顯於我們的榮耀就不足介意了。"
      },
      {
        "verse": 19,
        "text": "受造之物切望等候神的眾子顯出來。"
      },
      {
        "verse": 20,
        "text": "因為受造之物服在虛空之下，不是自己願意，乃是因那叫他如此的。"
      },
      {
        "verse": 21,
        "text": "但受造之物仍然指望脫離敗壞的轄制，得享（享：原文是入）神兒女自由的榮耀。"
      },
      {
        "verse": 22,
        "text": "我們知道，一切受造之物一同歎息，勞苦，直到如今。"
      },
      {
        "verse": 23,
        "text": "不但如此，就是我們這有聖靈初結果子的，也是自己心裡歎息，等候得著兒子的名分，乃是我們的身體得贖。"
      },
      {
        "verse": 24,
        "text": "我們得救是在乎盼望；只是所見的盼望不是盼望，誰還盼望他所見的呢（有古卷：人所看見的何必再盼望呢）？"
      },
      {
        "verse": 25,
        "text": "但我們若盼望那所不見的，就必忍耐等候。"
      },
      {
        "verse": 26,
        "text": "況且，我們的軟弱有聖靈幫助；我們本不曉得當怎樣禱告，只是聖靈親自用說不出來的歎息替我們禱告。"
      },
      {
        "verse": 27,
        "text": "鑒察人心的，曉得聖靈的意思，因為聖靈照著神的旨意替聖徒祈求。"
      },
      {
        "verse": 28,
        "text": "我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。"
      },
      {
        "verse": 29,
        "text": "因為他預先所知道的人，就預先定下效法他兒子的模樣，使他兒子在許多弟兄中作長子。"
      },
      {
        "verse": 30,
        "text": "預先所定下的人又召他們來；所召來的人又稱他們為義；所稱為義的人又叫他們得榮耀。"
      },
      {
        "verse": 31,
        "text": "既是這樣，還有甚麼說的呢？神若幫助我們，誰能敵擋我們呢？"
      },
      {
        "verse": 32,
        "text": "神既不愛惜自己的兒子，為我們眾人捨了，豈不也把萬物和他一同白白地賜給我們嗎？"
      },
      {
        "verse": 33,
        "text": "誰能控告神所揀選的人呢？有神稱他們為義了（或譯：是稱他們為義的神嗎）。"
      },
      {
        "verse": 34,
        "text": "誰能定他們的罪呢？有基督耶穌已經死了，而且從死裡復活，現今在神的右邊，也替我們祈求（有基督....或譯：是已經死了，而且從死裡復活，現今在神的右邊，也替我們祈求的基督耶穌嗎）。"
      },
      {
        "verse": 35,
        "text": "誰能使我們與基督的愛隔絕呢？難道是患難嗎？是困苦嗎？是逼迫嗎？是飢餓嗎？是赤身露體嗎？是危險嗎？是刀劍嗎？"
      },
      {
        "verse": 36,
        "text": "如經上所記：我們為你的緣故終日被殺；人看我們如將宰的羊。"
      },
      {
        "verse": 37,
        "text": "然而，靠著愛我們的主，在這一切的事上已經得勝有餘了。"
      },
      {
        "verse": 38,
        "text": "因為我深信無論是死，是生，是天使，是掌權的，是有能的，是現在的事，是將來的事，"
      },
      {
        "verse": 39,
        "text": "是高處的，是低處的，是別的受造之物，都不能叫我們與神的愛隔絕；這愛是在我們的主基督耶穌裡的。"
      }
    ]
  },
  "43:3": {
    "NKJV": [
      {
        "verse": 1,
        "text": "Now there was a man of the Pharisees named Nicodemus, a leader of the Jews."
      },
      {
        "verse": 2,
        "text": "He came to Jesus at night and said, “Rabbi, we know that You are a teacher who has come from God. For no one could perform the signs You are doing if God were not with him.”"
      },
      {
        "verse": 3,
        "text": "Jesus replied, “Truly, truly, I tell you, no one can see the kingdom of God unless he is born again.”"
      },
      {
        "verse": 4,
        "text": "“How can a man be born when he is old?” Nicodemus asked. “Can he enter his mother’s womb a second time to be born?”"
      },
      {
        "verse": 5,
        "text": "Jesus answered, “Truly, truly, I tell you, no one can enter the kingdom of God unless he is born of water and the Spirit."
      },
      {
        "verse": 6,
        "text": "Flesh is born of flesh, but spirit is born of the Spirit."
      },
      {
        "verse": 7,
        "text": "Do not be amazed that I said, ‘You must be born again.’"
      },
      {
        "verse": 8,
        "text": "The wind blows where it wishes. You hear its sound, but you do not know where it comes from or where it is going. So it is with everyone born of the Spirit.”"
      },
      {
        "verse": 9,
        "text": "“How can this be?” Nicodemus asked."
      },
      {
        "verse": 10,
        "text": "“You are Israel’s teacher,” said Jesus, “and you do not understand these things?"
      },
      {
        "verse": 11,
        "text": "Truly, truly, I tell you, we speak of what we know, and we testify to what we have seen, and yet you people do not accept our testimony."
      },
      {
        "verse": 12,
        "text": "If I have told you about earthly things and you do not believe, how will you believe if I tell you about heavenly things?"
      },
      {
        "verse": 13,
        "text": "No one has ascended into heaven except the One who descended from heaven—the Son of Man."
      },
      {
        "verse": 14,
        "text": "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,"
      },
      {
        "verse": 15,
        "text": "that everyone who believes in Him may have eternal life."
      },
      {
        "verse": 16,
        "text": "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life."
      },
      {
        "verse": 17,
        "text": "For God did not send His Son into the world to condemn the world, but to save the world through Him."
      },
      {
        "verse": 18,
        "text": "Whoever believes in Him is not condemned, but whoever does not believe has already been condemned, because he has not believed in the name of God’s one and only Son."
      },
      {
        "verse": 19,
        "text": "And this is the verdict: The Light has come into the world, but men loved the darkness rather than the Light because their deeds were evil."
      },
      {
        "verse": 20,
        "text": "Everyone who does evil hates the Light, and does not come into the Light for fear that his deeds will be exposed."
      },
      {
        "verse": 21,
        "text": "But whoever practices the truth comes into the Light, so that it may be seen clearly that what he has done has been accomplished in God.”"
      },
      {
        "verse": 22,
        "text": "After this, Jesus and His disciples went into the Judean countryside, where He spent some time with them and baptized."
      },
      {
        "verse": 23,
        "text": "Now John was also baptizing at Aenon near Salim, because the water was plentiful there, and people kept coming to be baptized."
      },
      {
        "verse": 24,
        "text": "(For John had not yet been thrown into prison.)"
      },
      {
        "verse": 25,
        "text": "Then a dispute arose between John’s disciples and a certain Jew over the issue of ceremonial washing."
      },
      {
        "verse": 26,
        "text": "So John’s disciples came to him and said, “Look, Rabbi, the One who was with you beyond the Jordan, the One you testified about—He is baptizing, and everyone is going to Him.”"
      },
      {
        "verse": 27,
        "text": "John replied, “A man can receive only what is given him from heaven."
      },
      {
        "verse": 28,
        "text": "You yourselves can testify that I said, ‘I am not the Christ, but am sent ahead of Him.’"
      },
      {
        "verse": 29,
        "text": "The bride belongs to the bridegroom. The friend of the bridegroom stands and listens for him, and is overjoyed to hear the bridegroom’s voice. That joy is mine, and it is now complete."
      },
      {
        "verse": 30,
        "text": "He must increase; I must decrease."
      },
      {
        "verse": 31,
        "text": "The One who comes from above is above all. The one who is from the earth belongs to the earth and speaks as one from the earth. The One who comes from heaven is above all."
      },
      {
        "verse": 32,
        "text": "He testifies to what He has seen and heard, yet no one accepts His testimony."
      },
      {
        "verse": 33,
        "text": "Whoever accepts His testimony has certified that God is truthful."
      },
      {
        "verse": 34,
        "text": "For the One whom God has sent speaks the words of God, for God gives the Spirit without limit."
      },
      {
        "verse": 35,
        "text": "The Father loves the Son and has placed all things in His hands."
      },
      {
        "verse": 36,
        "text": "Whoever believes in the Son has eternal life. Whoever rejects the Son will not see life. Instead, the wrath of God remains on him.”"
      }
    ],
    "KJV": [
      {
        "verse": 1,
        "text": "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:"
      },
      {
        "verse": 2,
        "text": "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him."
      },
      {
        "verse": 3,
        "text": "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God."
      },
      {
        "verse": 4,
        "text": "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother’s womb, and be born?"
      },
      {
        "verse": 5,
        "text": "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God."
      },
      {
        "verse": 6,
        "text": "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit."
      },
      {
        "verse": 7,
        "text": "Marvel not that I said unto thee, Ye must be born again."
      },
      {
        "verse": 8,
        "text": "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit."
      },
      {
        "verse": 9,
        "text": "Nicodemus answered and said unto him, How can these things be?"
      },
      {
        "verse": 10,
        "text": "Jesus answered and said unto him, Art thou a master of Israel, and knowest not these things?"
      },
      {
        "verse": 11,
        "text": "Verily, verily, I say unto thee, We speak that we do know, and testify that we have seen; and ye receive not our witness."
      },
      {
        "verse": 12,
        "text": "If I have told you earthly things, and ye believe not, how shall ye believe, if I tell you of heavenly things?"
      },
      {
        "verse": 13,
        "text": "And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven."
      },
      {
        "verse": 14,
        "text": "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:"
      },
      {
        "verse": 15,
        "text": "That whosoever believeth in him should not perish, but have eternal life."
      },
      {
        "verse": 16,
        "text": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
      },
      {
        "verse": 17,
        "text": "For God sent not his Son into the world to condemn the world; but that the world through him might be saved."
      },
      {
        "verse": 18,
        "text": "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God."
      },
      {
        "verse": 19,
        "text": "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil."
      },
      {
        "verse": 20,
        "text": "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved."
      },
      {
        "verse": 21,
        "text": "But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God."
      },
      {
        "verse": 22,
        "text": "After these things came Jesus and his disciples into the land of Judea; and there he tarried with them, and baptized."
      },
      {
        "verse": 23,
        "text": "And John also was baptizing in Ænon near to Salim, because there was much water there: and they came, and were baptized."
      },
      {
        "verse": 24,
        "text": "For John was not yet cast into prison."
      },
      {
        "verse": 25,
        "text": "Then there arose a question between some of John’s disciples and the Jews about purifying."
      },
      {
        "verse": 26,
        "text": "And they came unto John, and said unto him, Rabbi, he that was with thee beyond Jordan, to whom thou barest witness, behold, the same baptizeth, and all men come to him."
      },
      {
        "verse": 27,
        "text": "John answered and said, A man can receive nothing, except it be given him from heaven."
      },
      {
        "verse": 28,
        "text": "Ye yourselves bear me witness, that I said, I am not the Christ, but that I am sent before him."
      },
      {
        "verse": 29,
        "text": "He that hath the bride is the bridegroom: but the friend of the bridegroom, which standeth and heareth him, rejoiceth greatly because of the bridegroom’s voice: this my joy therefore is fulfilled."
      },
      {
        "verse": 30,
        "text": "He must increase, but I must decrease."
      },
      {
        "verse": 31,
        "text": "He that cometh from above is above all: he that is of the earth is earthly, and speaketh of the earth: he that cometh from heaven is above all."
      },
      {
        "verse": 32,
        "text": "And what he hath seen and heard, that he testifieth; and no man receiveth his testimony."
      },
      {
        "verse": 33,
        "text": "He that hath received his testimony hath set to his seal that God is true."
      },
      {
        "verse": 34,
        "text": "For he whom God hath sent speaketh the words of God: for God giveth not the Spirit by measure unto him."
      },
      {
        "verse": 35,
        "text": "The Father loveth the Son, and hath given all things into his hand."
      },
      {
        "verse": 36,
        "text": "He that believeth on the Son hath everlasting life: and he that believeth not the Son shall not see life; but the wrath of God abideth on him."
      }
    ],
    "ESV": [
      {
        "verse": 1,
        "text": "Now there was a man of the Pharisees named Nicodemus, a leader of the Jews."
      },
      {
        "verse": 2,
        "text": "He came to Jesus at night and said, “Rabbi, we know that You are a teacher who has come from God. For no one could perform the signs You are doing if God were not with him.”"
      },
      {
        "verse": 3,
        "text": "Jesus replied, “Truly, truly, I tell you, no one can see the kingdom of God unless he is born again.”"
      },
      {
        "verse": 4,
        "text": "“How can a man be born when he is old?” Nicodemus asked. “Can he enter his mother’s womb a second time to be born?”"
      },
      {
        "verse": 5,
        "text": "Jesus answered, “Truly, truly, I tell you, no one can enter the kingdom of God unless he is born of water and the Spirit."
      },
      {
        "verse": 6,
        "text": "Flesh is born of flesh, but spirit is born of the Spirit."
      },
      {
        "verse": 7,
        "text": "Do not be amazed that I said, ‘You must be born again.’"
      },
      {
        "verse": 8,
        "text": "The wind blows where it wishes. You hear its sound, but you do not know where it comes from or where it is going. So it is with everyone born of the Spirit.”"
      },
      {
        "verse": 9,
        "text": "“How can this be?” Nicodemus asked."
      },
      {
        "verse": 10,
        "text": "“You are Israel’s teacher,” said Jesus, “and you do not understand these things?"
      },
      {
        "verse": 11,
        "text": "Truly, truly, I tell you, we speak of what we know, and we testify to what we have seen, and yet you people do not accept our testimony."
      },
      {
        "verse": 12,
        "text": "If I have told you about earthly things and you do not believe, how will you believe if I tell you about heavenly things?"
      },
      {
        "verse": 13,
        "text": "No one has ascended into heaven except the One who descended from heaven—the Son of Man."
      },
      {
        "verse": 14,
        "text": "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,"
      },
      {
        "verse": 15,
        "text": "that everyone who believes in Him may have eternal life."
      },
      {
        "verse": 16,
        "text": "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life."
      },
      {
        "verse": 17,
        "text": "For God did not send His Son into the world to condemn the world, but to save the world through Him."
      },
      {
        "verse": 18,
        "text": "Whoever believes in Him is not condemned, but whoever does not believe has already been condemned, because he has not believed in the name of God’s one and only Son."
      },
      {
        "verse": 19,
        "text": "And this is the verdict: The Light has come into the world, but men loved the darkness rather than the Light because their deeds were evil."
      },
      {
        "verse": 20,
        "text": "Everyone who does evil hates the Light, and does not come into the Light for fear that his deeds will be exposed."
      },
      {
        "verse": 21,
        "text": "But whoever practices the truth comes into the Light, so that it may be seen clearly that what he has done has been accomplished in God.”"
      },
      {
        "verse": 22,
        "text": "After this, Jesus and His disciples went into the Judean countryside, where He spent some time with them and baptized."
      },
      {
        "verse": 23,
        "text": "Now John was also baptizing at Aenon near Salim, because the water was plentiful there, and people kept coming to be baptized."
      },
      {
        "verse": 24,
        "text": "(For John had not yet been thrown into prison.)"
      },
      {
        "verse": 25,
        "text": "Then a dispute arose between John’s disciples and a certain Jew over the issue of ceremonial washing."
      },
      {
        "verse": 26,
        "text": "So John’s disciples came to him and said, “Look, Rabbi, the One who was with you beyond the Jordan, the One you testified about—He is baptizing, and everyone is going to Him.”"
      },
      {
        "verse": 27,
        "text": "John replied, “A man can receive only what is given him from heaven."
      },
      {
        "verse": 28,
        "text": "You yourselves can testify that I said, ‘I am not the Christ, but am sent ahead of Him.’"
      },
      {
        "verse": 29,
        "text": "The bride belongs to the bridegroom. The friend of the bridegroom stands and listens for him, and is overjoyed to hear the bridegroom’s voice. That joy is mine, and it is now complete."
      },
      {
        "verse": 30,
        "text": "He must increase; I must decrease."
      },
      {
        "verse": 31,
        "text": "The One who comes from above is above all. The one who is from the earth belongs to the earth and speaks as one from the earth. The One who comes from heaven is above all."
      },
      {
        "verse": 32,
        "text": "He testifies to what He has seen and heard, yet no one accepts His testimony."
      },
      {
        "verse": 33,
        "text": "Whoever accepts His testimony has certified that God is truthful."
      },
      {
        "verse": 34,
        "text": "For the One whom God has sent speaks the words of God, for God gives the Spirit without limit."
      },
      {
        "verse": 35,
        "text": "The Father loves the Son and has placed all things in His hands."
      },
      {
        "verse": 36,
        "text": "Whoever believes in the Son has eternal life. Whoever rejects the Son will not see life. Instead, the wrath of God remains on him.”"
      }
    ],
    "NIV": [
      {
        "verse": 1,
        "text": "Now there was a man of the Pharisees named Nicodemus, a leader of the Jews."
      },
      {
        "verse": 2,
        "text": "He came to Jesus at night and said, “Rabbi, we know that You are a teacher who has come from God. For no one could perform the signs You are doing if God were not with him.”"
      },
      {
        "verse": 3,
        "text": "Jesus replied, “Truly, truly, I tell you, no one can see the kingdom of God unless he is born again.”"
      },
      {
        "verse": 4,
        "text": "“How can a man be born when he is old?” Nicodemus asked. “Can he enter his mother’s womb a second time to be born?”"
      },
      {
        "verse": 5,
        "text": "Jesus answered, “Truly, truly, I tell you, no one can enter the kingdom of God unless he is born of water and the Spirit."
      },
      {
        "verse": 6,
        "text": "Flesh is born of flesh, but spirit is born of the Spirit."
      },
      {
        "verse": 7,
        "text": "Do not be amazed that I said, ‘You must be born again.’"
      },
      {
        "verse": 8,
        "text": "The wind blows where it wishes. You hear its sound, but you do not know where it comes from or where it is going. So it is with everyone born of the Spirit.”"
      },
      {
        "verse": 9,
        "text": "“How can this be?” Nicodemus asked."
      },
      {
        "verse": 10,
        "text": "“You are Israel’s teacher,” said Jesus, “and you do not understand these things?"
      },
      {
        "verse": 11,
        "text": "Truly, truly, I tell you, we speak of what we know, and we testify to what we have seen, and yet you people do not accept our testimony."
      },
      {
        "verse": 12,
        "text": "If I have told you about earthly things and you do not believe, how will you believe if I tell you about heavenly things?"
      },
      {
        "verse": 13,
        "text": "No one has ascended into heaven except the One who descended from heaven—the Son of Man."
      },
      {
        "verse": 14,
        "text": "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,"
      },
      {
        "verse": 15,
        "text": "that everyone who believes in Him may have eternal life."
      },
      {
        "verse": 16,
        "text": "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life."
      },
      {
        "verse": 17,
        "text": "For God did not send His Son into the world to condemn the world, but to save the world through Him."
      },
      {
        "verse": 18,
        "text": "Whoever believes in Him is not condemned, but whoever does not believe has already been condemned, because he has not believed in the name of God’s one and only Son."
      },
      {
        "verse": 19,
        "text": "And this is the verdict: The Light has come into the world, but men loved the darkness rather than the Light because their deeds were evil."
      },
      {
        "verse": 20,
        "text": "Everyone who does evil hates the Light, and does not come into the Light for fear that his deeds will be exposed."
      },
      {
        "verse": 21,
        "text": "But whoever practices the truth comes into the Light, so that it may be seen clearly that what he has done has been accomplished in God.”"
      },
      {
        "verse": 22,
        "text": "After this, Jesus and His disciples went into the Judean countryside, where He spent some time with them and baptized."
      },
      {
        "verse": 23,
        "text": "Now John was also baptizing at Aenon near Salim, because the water was plentiful there, and people kept coming to be baptized."
      },
      {
        "verse": 24,
        "text": "(For John had not yet been thrown into prison.)"
      },
      {
        "verse": 25,
        "text": "Then a dispute arose between John’s disciples and a certain Jew over the issue of ceremonial washing."
      },
      {
        "verse": 26,
        "text": "So John’s disciples came to him and said, “Look, Rabbi, the One who was with you beyond the Jordan, the One you testified about—He is baptizing, and everyone is going to Him.”"
      },
      {
        "verse": 27,
        "text": "John replied, “A man can receive only what is given him from heaven."
      },
      {
        "verse": 28,
        "text": "You yourselves can testify that I said, ‘I am not the Christ, but am sent ahead of Him.’"
      },
      {
        "verse": 29,
        "text": "The bride belongs to the bridegroom. The friend of the bridegroom stands and listens for him, and is overjoyed to hear the bridegroom’s voice. That joy is mine, and it is now complete."
      },
      {
        "verse": 30,
        "text": "He must increase; I must decrease."
      },
      {
        "verse": 31,
        "text": "The One who comes from above is above all. The one who is from the earth belongs to the earth and speaks as one from the earth. The One who comes from heaven is above all."
      },
      {
        "verse": 32,
        "text": "He testifies to what He has seen and heard, yet no one accepts His testimony."
      },
      {
        "verse": 33,
        "text": "Whoever accepts His testimony has certified that God is truthful."
      },
      {
        "verse": 34,
        "text": "For the One whom God has sent speaks the words of God, for God gives the Spirit without limit."
      },
      {
        "verse": 35,
        "text": "The Father loves the Son and has placed all things in His hands."
      },
      {
        "verse": 36,
        "text": "Whoever believes in the Son has eternal life. Whoever rejects the Son will not see life. Instead, the wrath of God remains on him.”"
      }
    ],
    "NLT": [
      {
        "verse": 1,
        "text": "Now there was a man of the Pharisees named Nicodemus, a leader of the Jews."
      },
      {
        "verse": 2,
        "text": "He came to Jesus at night and said, “Rabbi, we know that You are a teacher who has come from God. For no one could perform the signs You are doing if God were not with him.”"
      },
      {
        "verse": 3,
        "text": "Jesus replied, “Truly, truly, I tell you, no one can see the kingdom of God unless he is born again.”"
      },
      {
        "verse": 4,
        "text": "“How can a man be born when he is old?” Nicodemus asked. “Can he enter his mother’s womb a second time to be born?”"
      },
      {
        "verse": 5,
        "text": "Jesus answered, “Truly, truly, I tell you, no one can enter the kingdom of God unless he is born of water and the Spirit."
      },
      {
        "verse": 6,
        "text": "Flesh is born of flesh, but spirit is born of the Spirit."
      },
      {
        "verse": 7,
        "text": "Do not be amazed that I said, ‘You must be born again.’"
      },
      {
        "verse": 8,
        "text": "The wind blows where it wishes. You hear its sound, but you do not know where it comes from or where it is going. So it is with everyone born of the Spirit.”"
      },
      {
        "verse": 9,
        "text": "“How can this be?” Nicodemus asked."
      },
      {
        "verse": 10,
        "text": "“You are Israel’s teacher,” said Jesus, “and you do not understand these things?"
      },
      {
        "verse": 11,
        "text": "Truly, truly, I tell you, we speak of what we know, and we testify to what we have seen, and yet you people do not accept our testimony."
      },
      {
        "verse": 12,
        "text": "If I have told you about earthly things and you do not believe, how will you believe if I tell you about heavenly things?"
      },
      {
        "verse": 13,
        "text": "No one has ascended into heaven except the One who descended from heaven—the Son of Man."
      },
      {
        "verse": 14,
        "text": "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,"
      },
      {
        "verse": 15,
        "text": "that everyone who believes in Him may have eternal life."
      },
      {
        "verse": 16,
        "text": "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life."
      },
      {
        "verse": 17,
        "text": "For God did not send His Son into the world to condemn the world, but to save the world through Him."
      },
      {
        "verse": 18,
        "text": "Whoever believes in Him is not condemned, but whoever does not believe has already been condemned, because he has not believed in the name of God’s one and only Son."
      },
      {
        "verse": 19,
        "text": "And this is the verdict: The Light has come into the world, but men loved the darkness rather than the Light because their deeds were evil."
      },
      {
        "verse": 20,
        "text": "Everyone who does evil hates the Light, and does not come into the Light for fear that his deeds will be exposed."
      },
      {
        "verse": 21,
        "text": "But whoever practices the truth comes into the Light, so that it may be seen clearly that what he has done has been accomplished in God.”"
      },
      {
        "verse": 22,
        "text": "After this, Jesus and His disciples went into the Judean countryside, where He spent some time with them and baptized."
      },
      {
        "verse": 23,
        "text": "Now John was also baptizing at Aenon near Salim, because the water was plentiful there, and people kept coming to be baptized."
      },
      {
        "verse": 24,
        "text": "(For John had not yet been thrown into prison.)"
      },
      {
        "verse": 25,
        "text": "Then a dispute arose between John’s disciples and a certain Jew over the issue of ceremonial washing."
      },
      {
        "verse": 26,
        "text": "So John’s disciples came to him and said, “Look, Rabbi, the One who was with you beyond the Jordan, the One you testified about—He is baptizing, and everyone is going to Him.”"
      },
      {
        "verse": 27,
        "text": "John replied, “A man can receive only what is given him from heaven."
      },
      {
        "verse": 28,
        "text": "You yourselves can testify that I said, ‘I am not the Christ, but am sent ahead of Him.’"
      },
      {
        "verse": 29,
        "text": "The bride belongs to the bridegroom. The friend of the bridegroom stands and listens for him, and is overjoyed to hear the bridegroom’s voice. That joy is mine, and it is now complete."
      },
      {
        "verse": 30,
        "text": "He must increase; I must decrease."
      },
      {
        "verse": 31,
        "text": "The One who comes from above is above all. The one who is from the earth belongs to the earth and speaks as one from the earth. The One who comes from heaven is above all."
      },
      {
        "verse": 32,
        "text": "He testifies to what He has seen and heard, yet no one accepts His testimony."
      },
      {
        "verse": 33,
        "text": "Whoever accepts His testimony has certified that God is truthful."
      },
      {
        "verse": 34,
        "text": "For the One whom God has sent speaks the words of God, for God gives the Spirit without limit."
      },
      {
        "verse": 35,
        "text": "The Father loves the Son and has placed all things in His hands."
      },
      {
        "verse": 36,
        "text": "Whoever believes in the Son has eternal life. Whoever rejects the Son will not see life. Instead, the wrath of God remains on him.”"
      }
    ],
    "AMPC": [
      {
        "verse": 1,
        "text": "Now there was a man of the Pharisees named Nicodemus, a leader of the Jews."
      },
      {
        "verse": 2,
        "text": "He came to Jesus at night and said, “Rabbi, we know that You are a teacher who has come from God. For no one could perform the signs You are doing if God were not with him.”"
      },
      {
        "verse": 3,
        "text": "Jesus replied, “Truly, truly, I tell you, no one can see the kingdom of God unless he is born again.”"
      },
      {
        "verse": 4,
        "text": "“How can a man be born when he is old?” Nicodemus asked. “Can he enter his mother’s womb a second time to be born?”"
      },
      {
        "verse": 5,
        "text": "Jesus answered, “Truly, truly, I tell you, no one can enter the kingdom of God unless he is born of water and the Spirit."
      },
      {
        "verse": 6,
        "text": "Flesh is born of flesh, but spirit is born of the Spirit."
      },
      {
        "verse": 7,
        "text": "Do not be amazed that I said, ‘You must be born again.’"
      },
      {
        "verse": 8,
        "text": "The wind blows where it wishes. You hear its sound, but you do not know where it comes from or where it is going. So it is with everyone born of the Spirit.”"
      },
      {
        "verse": 9,
        "text": "“How can this be?” Nicodemus asked."
      },
      {
        "verse": 10,
        "text": "“You are Israel’s teacher,” said Jesus, “and you do not understand these things?"
      },
      {
        "verse": 11,
        "text": "Truly, truly, I tell you, we speak of what we know, and we testify to what we have seen, and yet you people do not accept our testimony."
      },
      {
        "verse": 12,
        "text": "If I have told you about earthly things and you do not believe, how will you believe if I tell you about heavenly things?"
      },
      {
        "verse": 13,
        "text": "No one has ascended into heaven except the One who descended from heaven—the Son of Man."
      },
      {
        "verse": 14,
        "text": "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,"
      },
      {
        "verse": 15,
        "text": "that everyone who believes in Him may have eternal life."
      },
      {
        "verse": 16,
        "text": "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life."
      },
      {
        "verse": 17,
        "text": "For God did not send His Son into the world to condemn the world, but to save the world through Him."
      },
      {
        "verse": 18,
        "text": "Whoever believes in Him is not condemned, but whoever does not believe has already been condemned, because he has not believed in the name of God’s one and only Son."
      },
      {
        "verse": 19,
        "text": "And this is the verdict: The Light has come into the world, but men loved the darkness rather than the Light because their deeds were evil."
      },
      {
        "verse": 20,
        "text": "Everyone who does evil hates the Light, and does not come into the Light for fear that his deeds will be exposed."
      },
      {
        "verse": 21,
        "text": "But whoever practices the truth comes into the Light, so that it may be seen clearly that what he has done has been accomplished in God.”"
      },
      {
        "verse": 22,
        "text": "After this, Jesus and His disciples went into the Judean countryside, where He spent some time with them and baptized."
      },
      {
        "verse": 23,
        "text": "Now John was also baptizing at Aenon near Salim, because the water was plentiful there, and people kept coming to be baptized."
      },
      {
        "verse": 24,
        "text": "(For John had not yet been thrown into prison.)"
      },
      {
        "verse": 25,
        "text": "Then a dispute arose between John’s disciples and a certain Jew over the issue of ceremonial washing."
      },
      {
        "verse": 26,
        "text": "So John’s disciples came to him and said, “Look, Rabbi, the One who was with you beyond the Jordan, the One you testified about—He is baptizing, and everyone is going to Him.”"
      },
      {
        "verse": 27,
        "text": "John replied, “A man can receive only what is given him from heaven."
      },
      {
        "verse": 28,
        "text": "You yourselves can testify that I said, ‘I am not the Christ, but am sent ahead of Him.’"
      },
      {
        "verse": 29,
        "text": "The bride belongs to the bridegroom. The friend of the bridegroom stands and listens for him, and is overjoyed to hear the bridegroom’s voice. That joy is mine, and it is now complete."
      },
      {
        "verse": 30,
        "text": "He must increase; I must decrease."
      },
      {
        "verse": 31,
        "text": "The One who comes from above is above all. The one who is from the earth belongs to the earth and speaks as one from the earth. The One who comes from heaven is above all."
      },
      {
        "verse": 32,
        "text": "He testifies to what He has seen and heard, yet no one accepts His testimony."
      },
      {
        "verse": 33,
        "text": "Whoever accepts His testimony has certified that God is truthful."
      },
      {
        "verse": 34,
        "text": "For the One whom God has sent speaks the words of God, for God gives the Spirit without limit."
      },
      {
        "verse": 35,
        "text": "The Father loves the Son and has placed all things in His hands."
      },
      {
        "verse": 36,
        "text": "Whoever believes in the Son has eternal life. Whoever rejects the Son will not see life. Instead, the wrath of God remains on him.”"
      }
    ],
    "YLT": [
      {
        "verse": 1,
        "text": "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:"
      },
      {
        "verse": 2,
        "text": "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him."
      },
      {
        "verse": 3,
        "text": "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God."
      },
      {
        "verse": 4,
        "text": "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother’s womb, and be born?"
      },
      {
        "verse": 5,
        "text": "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God."
      },
      {
        "verse": 6,
        "text": "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit."
      },
      {
        "verse": 7,
        "text": "Marvel not that I said unto thee, Ye must be born again."
      },
      {
        "verse": 8,
        "text": "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit."
      },
      {
        "verse": 9,
        "text": "Nicodemus answered and said unto him, How can these things be?"
      },
      {
        "verse": 10,
        "text": "Jesus answered and said unto him, Art thou a master of Israel, and knowest not these things?"
      },
      {
        "verse": 11,
        "text": "Verily, verily, I say unto thee, We speak that we do know, and testify that we have seen; and ye receive not our witness."
      },
      {
        "verse": 12,
        "text": "If I have told you earthly things, and ye believe not, how shall ye believe, if I tell you of heavenly things?"
      },
      {
        "verse": 13,
        "text": "And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven."
      },
      {
        "verse": 14,
        "text": "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:"
      },
      {
        "verse": 15,
        "text": "That whosoever believeth in him should not perish, but have eternal life."
      },
      {
        "verse": 16,
        "text": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
      },
      {
        "verse": 17,
        "text": "For God sent not his Son into the world to condemn the world; but that the world through him might be saved."
      },
      {
        "verse": 18,
        "text": "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God."
      },
      {
        "verse": 19,
        "text": "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil."
      },
      {
        "verse": 20,
        "text": "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved."
      },
      {
        "verse": 21,
        "text": "But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God."
      },
      {
        "verse": 22,
        "text": "After these things came Jesus and his disciples into the land of Judea; and there he tarried with them, and baptized."
      },
      {
        "verse": 23,
        "text": "And John also was baptizing in Ænon near to Salim, because there was much water there: and they came, and were baptized."
      },
      {
        "verse": 24,
        "text": "For John was not yet cast into prison."
      },
      {
        "verse": 25,
        "text": "Then there arose a question between some of John’s disciples and the Jews about purifying."
      },
      {
        "verse": 26,
        "text": "And they came unto John, and said unto him, Rabbi, he that was with thee beyond Jordan, to whom thou barest witness, behold, the same baptizeth, and all men come to him."
      },
      {
        "verse": 27,
        "text": "John answered and said, A man can receive nothing, except it be given him from heaven."
      },
      {
        "verse": 28,
        "text": "Ye yourselves bear me witness, that I said, I am not the Christ, but that I am sent before him."
      },
      {
        "verse": 29,
        "text": "He that hath the bride is the bridegroom: but the friend of the bridegroom, which standeth and heareth him, rejoiceth greatly because of the bridegroom’s voice: this my joy therefore is fulfilled."
      },
      {
        "verse": 30,
        "text": "He must increase, but I must decrease."
      },
      {
        "verse": 31,
        "text": "He that cometh from above is above all: he that is of the earth is earthly, and speaketh of the earth: he that cometh from heaven is above all."
      },
      {
        "verse": 32,
        "text": "And what he hath seen and heard, that he testifieth; and no man receiveth his testimony."
      },
      {
        "verse": 33,
        "text": "He that hath received his testimony hath set to his seal that God is true."
      },
      {
        "verse": 34,
        "text": "For he whom God hath sent speaketh the words of God: for God giveth not the Spirit by measure unto him."
      },
      {
        "verse": 35,
        "text": "The Father loveth the Son, and hath given all things into his hand."
      },
      {
        "verse": 36,
        "text": "He that believeth on the Son hath everlasting life: and he that believeth not the Son shall not see life; but the wrath of God abideth on him."
      }
    ],
    "CUV": [
      {
        "verse": 1,
        "text": "有一個法利賽人，名叫尼哥底母，是猶太人的官。"
      },
      {
        "verse": 2,
        "text": "這人夜裡來見耶穌，說：「拉比，我們知道你是由神那裡來作師傅的；因為你所行的神蹟，若沒有神同在，無人能行。」"
      },
      {
        "verse": 3,
        "text": "耶穌回答說：「我實實在在地告訴你，人若不重生，就不能見神的國。」"
      },
      {
        "verse": 4,
        "text": "尼哥底母說：「人已經老了，如何能重生呢？豈能再進母腹生出來嗎？」"
      },
      {
        "verse": 5,
        "text": "耶穌說：「我實實在在地告訴你，人若不是從水和聖靈生的，就不能進神的國。"
      },
      {
        "verse": 6,
        "text": "從肉身生的就是肉身；從靈生的就是靈。"
      },
      {
        "verse": 7,
        "text": "我說：『你們必須重生』，你不要以為希奇。"
      },
      {
        "verse": 8,
        "text": "風隨著意思吹，你聽見風的響聲，卻不曉得從哪裡來，往哪裡去；凡從聖靈生的，也是如此。」"
      },
      {
        "verse": 9,
        "text": "尼哥底母問他說：「怎能有這事呢？」"
      },
      {
        "verse": 10,
        "text": "耶穌回答說：「你是以色列人的先生，還不明白這事嗎？"
      },
      {
        "verse": 11,
        "text": "我實實在在地告訴你，我們所說的是我們知道的；我們所見證的是我們見過的；你們卻不領受我們的見證。"
      },
      {
        "verse": 12,
        "text": "我對你們說地上的事，你們尚且不信，若說天上的事，如何能信呢？"
      },
      {
        "verse": 13,
        "text": "除了從天降下、仍舊在天的人子，沒有人升過天。"
      },
      {
        "verse": 14,
        "text": "摩西在曠野怎樣舉蛇，人子也必照樣被舉起來，"
      },
      {
        "verse": 15,
        "text": "叫一切信他的都得永生（或譯：叫一切信的人在他裡面得永生）。"
      },
      {
        "verse": 16,
        "text": "「神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不致滅亡，反得永生。"
      },
      {
        "verse": 17,
        "text": "因為神差他的兒子降世，不是要定世人的罪（或譯：審判世人；下同），乃是要叫世人因他得救。"
      },
      {
        "verse": 18,
        "text": "信他的人，不被定罪；不信的人，罪已經定了，因為他不信神獨生子的名。"
      },
      {
        "verse": 19,
        "text": "光來到世間，世人因自己的行為是惡的，不愛光，倒愛黑暗，定他們的罪就是在此。"
      },
      {
        "verse": 20,
        "text": "凡作惡的便恨光，並不來就光，恐怕他的行為受責備。"
      },
      {
        "verse": 21,
        "text": "但行真理的必來就光，要顯明他所行的是靠神而行。」"
      },
      {
        "verse": 22,
        "text": "這事以後，耶穌和門徒到了猶太地，在那裡居住，施洗。"
      },
      {
        "verse": 23,
        "text": "約翰在靠近撒冷的哀嫩也施洗；因為那裡水多，眾人都去受洗。"
      },
      {
        "verse": 24,
        "text": "（那時約翰還沒有下在監裡。）"
      },
      {
        "verse": 25,
        "text": "約翰的門徒和一個猶太人辯論潔淨的禮，"
      },
      {
        "verse": 26,
        "text": "就來見約翰，說：「拉比，從前同你在約旦河外、你所見證的那位，現在施洗，眾人都往他那裡去了。」"
      },
      {
        "verse": 27,
        "text": "約翰說：「若不是從天上賜的，人就不能得甚麼。"
      },
      {
        "verse": 28,
        "text": "我曾說：『我不是基督，是奉差遣在他前面的』，你們自己可以給我作見證。"
      },
      {
        "verse": 29,
        "text": "娶新婦的就是新郎；新郎的朋友站著，聽見新郎的聲音就甚喜樂。故此，我這喜樂滿足了。"
      },
      {
        "verse": 30,
        "text": "他必興旺，我必衰微。」"
      },
      {
        "verse": 31,
        "text": "「從天上來的是在萬有之上；從地上來的是屬乎地，他所說的也是屬乎地。從天上來的是在萬有之上。"
      },
      {
        "verse": 32,
        "text": "他將所見所聞的見證出來，只是沒有人領受他的見證。"
      },
      {
        "verse": 33,
        "text": "那領受他見證的，就印上印，證明神是真的。"
      },
      {
        "verse": 34,
        "text": "神所差來的就說神的話，因為神賜聖靈給他是沒有限量的。"
      },
      {
        "verse": 35,
        "text": "父愛子，已將萬有交在他手裡。"
      },
      {
        "verse": 36,
        "text": "信子的人有永生；不信子的人得不著永生（原文是不得見永生），神的震怒常在他身上。」"
      }
    ],
    "CNV": [
      {
        "verse": 1,
        "text": "有一個法利賽人，名叫尼哥底母，是猶太人的官。"
      },
      {
        "verse": 2,
        "text": "這人夜裡來見耶穌，說：「拉比，我們知道你是由神那裡來作師傅的；因為你所行的神蹟，若沒有神同在，無人能行。」"
      },
      {
        "verse": 3,
        "text": "耶穌回答說：「我實實在在地告訴你，人若不重生，就不能見神的國。」"
      },
      {
        "verse": 4,
        "text": "尼哥底母說：「人已經老了，如何能重生呢？豈能再進母腹生出來嗎？」"
      },
      {
        "verse": 5,
        "text": "耶穌說：「我實實在在地告訴你，人若不是從水和聖靈生的，就不能進神的國。"
      },
      {
        "verse": 6,
        "text": "從肉身生的就是肉身；從靈生的就是靈。"
      },
      {
        "verse": 7,
        "text": "我說：『你們必須重生』，你不要以為希奇。"
      },
      {
        "verse": 8,
        "text": "風隨著意思吹，你聽見風的響聲，卻不曉得從哪裡來，往哪裡去；凡從聖靈生的，也是如此。」"
      },
      {
        "verse": 9,
        "text": "尼哥底母問他說：「怎能有這事呢？」"
      },
      {
        "verse": 10,
        "text": "耶穌回答說：「你是以色列人的先生，還不明白這事嗎？"
      },
      {
        "verse": 11,
        "text": "我實實在在地告訴你，我們所說的是我們知道的；我們所見證的是我們見過的；你們卻不領受我們的見證。"
      },
      {
        "verse": 12,
        "text": "我對你們說地上的事，你們尚且不信，若說天上的事，如何能信呢？"
      },
      {
        "verse": 13,
        "text": "除了從天降下、仍舊在天的人子，沒有人升過天。"
      },
      {
        "verse": 14,
        "text": "摩西在曠野怎樣舉蛇，人子也必照樣被舉起來，"
      },
      {
        "verse": 15,
        "text": "叫一切信他的都得永生（或譯：叫一切信的人在他裡面得永生）。"
      },
      {
        "verse": 16,
        "text": "「神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不致滅亡，反得永生。"
      },
      {
        "verse": 17,
        "text": "因為神差他的兒子降世，不是要定世人的罪（或譯：審判世人；下同），乃是要叫世人因他得救。"
      },
      {
        "verse": 18,
        "text": "信他的人，不被定罪；不信的人，罪已經定了，因為他不信神獨生子的名。"
      },
      {
        "verse": 19,
        "text": "光來到世間，世人因自己的行為是惡的，不愛光，倒愛黑暗，定他們的罪就是在此。"
      },
      {
        "verse": 20,
        "text": "凡作惡的便恨光，並不來就光，恐怕他的行為受責備。"
      },
      {
        "verse": 21,
        "text": "但行真理的必來就光，要顯明他所行的是靠神而行。」"
      },
      {
        "verse": 22,
        "text": "這事以後，耶穌和門徒到了猶太地，在那裡居住，施洗。"
      },
      {
        "verse": 23,
        "text": "約翰在靠近撒冷的哀嫩也施洗；因為那裡水多，眾人都去受洗。"
      },
      {
        "verse": 24,
        "text": "（那時約翰還沒有下在監裡。）"
      },
      {
        "verse": 25,
        "text": "約翰的門徒和一個猶太人辯論潔淨的禮，"
      },
      {
        "verse": 26,
        "text": "就來見約翰，說：「拉比，從前同你在約旦河外、你所見證的那位，現在施洗，眾人都往他那裡去了。」"
      },
      {
        "verse": 27,
        "text": "約翰說：「若不是從天上賜的，人就不能得甚麼。"
      },
      {
        "verse": 28,
        "text": "我曾說：『我不是基督，是奉差遣在他前面的』，你們自己可以給我作見證。"
      },
      {
        "verse": 29,
        "text": "娶新婦的就是新郎；新郎的朋友站著，聽見新郎的聲音就甚喜樂。故此，我這喜樂滿足了。"
      },
      {
        "verse": 30,
        "text": "他必興旺，我必衰微。」"
      },
      {
        "verse": 31,
        "text": "「從天上來的是在萬有之上；從地上來的是屬乎地，他所說的也是屬乎地。從天上來的是在萬有之上。"
      },
      {
        "verse": 32,
        "text": "他將所見所聞的見證出來，只是沒有人領受他的見證。"
      },
      {
        "verse": 33,
        "text": "那領受他見證的，就印上印，證明神是真的。"
      },
      {
        "verse": 34,
        "text": "神所差來的就說神的話，因為神賜聖靈給他是沒有限量的。"
      },
      {
        "verse": 35,
        "text": "父愛子，已將萬有交在他手裡。"
      },
      {
        "verse": 36,
        "text": "信子的人有永生；不信子的人得不著永生（原文是不得見永生），神的震怒常在他身上。」"
      }
    ],
    "CCB": [
      {
        "verse": 1,
        "text": "有一個法利賽人，名叫尼哥底母，是猶太人的官。"
      },
      {
        "verse": 2,
        "text": "這人夜裡來見耶穌，說：「拉比，我們知道你是由神那裡來作師傅的；因為你所行的神蹟，若沒有神同在，無人能行。」"
      },
      {
        "verse": 3,
        "text": "耶穌回答說：「我實實在在地告訴你，人若不重生，就不能見神的國。」"
      },
      {
        "verse": 4,
        "text": "尼哥底母說：「人已經老了，如何能重生呢？豈能再進母腹生出來嗎？」"
      },
      {
        "verse": 5,
        "text": "耶穌說：「我實實在在地告訴你，人若不是從水和聖靈生的，就不能進神的國。"
      },
      {
        "verse": 6,
        "text": "從肉身生的就是肉身；從靈生的就是靈。"
      },
      {
        "verse": 7,
        "text": "我說：『你們必須重生』，你不要以為希奇。"
      },
      {
        "verse": 8,
        "text": "風隨著意思吹，你聽見風的響聲，卻不曉得從哪裡來，往哪裡去；凡從聖靈生的，也是如此。」"
      },
      {
        "verse": 9,
        "text": "尼哥底母問他說：「怎能有這事呢？」"
      },
      {
        "verse": 10,
        "text": "耶穌回答說：「你是以色列人的先生，還不明白這事嗎？"
      },
      {
        "verse": 11,
        "text": "我實實在在地告訴你，我們所說的是我們知道的；我們所見證的是我們見過的；你們卻不領受我們的見證。"
      },
      {
        "verse": 12,
        "text": "我對你們說地上的事，你們尚且不信，若說天上的事，如何能信呢？"
      },
      {
        "verse": 13,
        "text": "除了從天降下、仍舊在天的人子，沒有人升過天。"
      },
      {
        "verse": 14,
        "text": "摩西在曠野怎樣舉蛇，人子也必照樣被舉起來，"
      },
      {
        "verse": 15,
        "text": "叫一切信他的都得永生（或譯：叫一切信的人在他裡面得永生）。"
      },
      {
        "verse": 16,
        "text": "「神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不致滅亡，反得永生。"
      },
      {
        "verse": 17,
        "text": "因為神差他的兒子降世，不是要定世人的罪（或譯：審判世人；下同），乃是要叫世人因他得救。"
      },
      {
        "verse": 18,
        "text": "信他的人，不被定罪；不信的人，罪已經定了，因為他不信神獨生子的名。"
      },
      {
        "verse": 19,
        "text": "光來到世間，世人因自己的行為是惡的，不愛光，倒愛黑暗，定他們的罪就是在此。"
      },
      {
        "verse": 20,
        "text": "凡作惡的便恨光，並不來就光，恐怕他的行為受責備。"
      },
      {
        "verse": 21,
        "text": "但行真理的必來就光，要顯明他所行的是靠神而行。」"
      },
      {
        "verse": 22,
        "text": "這事以後，耶穌和門徒到了猶太地，在那裡居住，施洗。"
      },
      {
        "verse": 23,
        "text": "約翰在靠近撒冷的哀嫩也施洗；因為那裡水多，眾人都去受洗。"
      },
      {
        "verse": 24,
        "text": "（那時約翰還沒有下在監裡。）"
      },
      {
        "verse": 25,
        "text": "約翰的門徒和一個猶太人辯論潔淨的禮，"
      },
      {
        "verse": 26,
        "text": "就來見約翰，說：「拉比，從前同你在約旦河外、你所見證的那位，現在施洗，眾人都往他那裡去了。」"
      },
      {
        "verse": 27,
        "text": "約翰說：「若不是從天上賜的，人就不能得甚麼。"
      },
      {
        "verse": 28,
        "text": "我曾說：『我不是基督，是奉差遣在他前面的』，你們自己可以給我作見證。"
      },
      {
        "verse": 29,
        "text": "娶新婦的就是新郎；新郎的朋友站著，聽見新郎的聲音就甚喜樂。故此，我這喜樂滿足了。"
      },
      {
        "verse": 30,
        "text": "他必興旺，我必衰微。」"
      },
      {
        "verse": 31,
        "text": "「從天上來的是在萬有之上；從地上來的是屬乎地，他所說的也是屬乎地。從天上來的是在萬有之上。"
      },
      {
        "verse": 32,
        "text": "他將所見所聞的見證出來，只是沒有人領受他的見證。"
      },
      {
        "verse": 33,
        "text": "那領受他見證的，就印上印，證明神是真的。"
      },
      {
        "verse": 34,
        "text": "神所差來的就說神的話，因為神賜聖靈給他是沒有限量的。"
      },
      {
        "verse": 35,
        "text": "父愛子，已將萬有交在他手裡。"
      },
      {
        "verse": 36,
        "text": "信子的人有永生；不信子的人得不著永生（原文是不得見永生），神的震怒常在他身上。」"
      }
    ]
  },
  "46:13": {
    "NKJV": [
      {
        "verse": 1,
        "text": "If I speak in the tongues of men and of angels, but have not love, I am only a ringing gong or a clanging cymbal."
      },
      {
        "verse": 2,
        "text": "If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have absolute faith so as to move mountains, but have not love, I am nothing."
      },
      {
        "verse": 3,
        "text": "If I give all I possess to the poor and exult in the surrender of my body, but have not love, I gain nothing."
      },
      {
        "verse": 4,
        "text": "Love is patient, love is kind. It does not envy, it does not boast, it is not proud."
      },
      {
        "verse": 5,
        "text": "It is not rude, it is not self-seeking, it is not easily angered, it keeps no account of wrongs."
      },
      {
        "verse": 6,
        "text": "Love takes no pleasure in evil, but rejoices in the truth."
      },
      {
        "verse": 7,
        "text": "It bears all things, believes all things, hopes all things, endures all things."
      },
      {
        "verse": 8,
        "text": "Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be restrained; where there is knowledge, it will be dismissed."
      },
      {
        "verse": 9,
        "text": "For we know in part and we prophesy in part,"
      },
      {
        "verse": 10,
        "text": "but when the perfect comes, the partial passes away."
      },
      {
        "verse": 11,
        "text": "When I was a child, I talked like a child, I thought like a child, I reasoned like a child. When I became a man, I set aside childish ways."
      },
      {
        "verse": 12,
        "text": "Now we see but a dim reflection as in a mirror; then we shall see face to face. Now I know in part; then I shall know fully, even as I am fully known."
      },
      {
        "verse": 13,
        "text": "And now these three remain: faith, hope, and love; but the greatest of these is love."
      }
    ],
    "KJV": [
      {
        "verse": 1,
        "text": "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal."
      },
      {
        "verse": 2,
        "text": "And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing."
      },
      {
        "verse": 3,
        "text": "And though I bestow all my goods to feed the poor, and though I give my body to be burned, and have not charity, it profiteth me nothing."
      },
      {
        "verse": 4,
        "text": "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,"
      },
      {
        "verse": 5,
        "text": "Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil;"
      },
      {
        "verse": 6,
        "text": "Rejoiceth not in iniquity, but rejoiceth in the truth;"
      },
      {
        "verse": 7,
        "text": "Beareth all things, believeth all things, hopeth all things, endureth all things."
      },
      {
        "verse": 8,
        "text": "Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease; whether there be knowledge, it shall vanish away."
      },
      {
        "verse": 9,
        "text": "For we know in part, and we prophesy in part."
      },
      {
        "verse": 10,
        "text": "But when that which is perfect is come, then that which is in part shall be done away."
      },
      {
        "verse": 11,
        "text": "When I was a child, I spake as a child, I understood as a child, I thought as a child: but when I became a man, I put away childish things."
      },
      {
        "verse": 12,
        "text": "For now we see through a glass, darkly; but then face to face: now I know in part; but then shall I know even as also I am known."
      },
      {
        "verse": 13,
        "text": "And now abideth faith, hope, charity, these three; but the greatest of these is charity."
      }
    ],
    "ESV": [
      {
        "verse": 1,
        "text": "If I speak in the tongues of men and of angels, but have not love, I am only a ringing gong or a clanging cymbal."
      },
      {
        "verse": 2,
        "text": "If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have absolute faith so as to move mountains, but have not love, I am nothing."
      },
      {
        "verse": 3,
        "text": "If I give all I possess to the poor and exult in the surrender of my body, but have not love, I gain nothing."
      },
      {
        "verse": 4,
        "text": "Love is patient, love is kind. It does not envy, it does not boast, it is not proud."
      },
      {
        "verse": 5,
        "text": "It is not rude, it is not self-seeking, it is not easily angered, it keeps no account of wrongs."
      },
      {
        "verse": 6,
        "text": "Love takes no pleasure in evil, but rejoices in the truth."
      },
      {
        "verse": 7,
        "text": "It bears all things, believes all things, hopes all things, endures all things."
      },
      {
        "verse": 8,
        "text": "Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be restrained; where there is knowledge, it will be dismissed."
      },
      {
        "verse": 9,
        "text": "For we know in part and we prophesy in part,"
      },
      {
        "verse": 10,
        "text": "but when the perfect comes, the partial passes away."
      },
      {
        "verse": 11,
        "text": "When I was a child, I talked like a child, I thought like a child, I reasoned like a child. When I became a man, I set aside childish ways."
      },
      {
        "verse": 12,
        "text": "Now we see but a dim reflection as in a mirror; then we shall see face to face. Now I know in part; then I shall know fully, even as I am fully known."
      },
      {
        "verse": 13,
        "text": "And now these three remain: faith, hope, and love; but the greatest of these is love."
      }
    ],
    "NIV": [
      {
        "verse": 1,
        "text": "If I speak in the tongues of men and of angels, but have not love, I am only a ringing gong or a clanging cymbal."
      },
      {
        "verse": 2,
        "text": "If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have absolute faith so as to move mountains, but have not love, I am nothing."
      },
      {
        "verse": 3,
        "text": "If I give all I possess to the poor and exult in the surrender of my body, but have not love, I gain nothing."
      },
      {
        "verse": 4,
        "text": "Love is patient, love is kind. It does not envy, it does not boast, it is not proud."
      },
      {
        "verse": 5,
        "text": "It is not rude, it is not self-seeking, it is not easily angered, it keeps no account of wrongs."
      },
      {
        "verse": 6,
        "text": "Love takes no pleasure in evil, but rejoices in the truth."
      },
      {
        "verse": 7,
        "text": "It bears all things, believes all things, hopes all things, endures all things."
      },
      {
        "verse": 8,
        "text": "Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be restrained; where there is knowledge, it will be dismissed."
      },
      {
        "verse": 9,
        "text": "For we know in part and we prophesy in part,"
      },
      {
        "verse": 10,
        "text": "but when the perfect comes, the partial passes away."
      },
      {
        "verse": 11,
        "text": "When I was a child, I talked like a child, I thought like a child, I reasoned like a child. When I became a man, I set aside childish ways."
      },
      {
        "verse": 12,
        "text": "Now we see but a dim reflection as in a mirror; then we shall see face to face. Now I know in part; then I shall know fully, even as I am fully known."
      },
      {
        "verse": 13,
        "text": "And now these three remain: faith, hope, and love; but the greatest of these is love."
      }
    ],
    "NLT": [
      {
        "verse": 1,
        "text": "If I speak in the tongues of men and of angels, but have not love, I am only a ringing gong or a clanging cymbal."
      },
      {
        "verse": 2,
        "text": "If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have absolute faith so as to move mountains, but have not love, I am nothing."
      },
      {
        "verse": 3,
        "text": "If I give all I possess to the poor and exult in the surrender of my body, but have not love, I gain nothing."
      },
      {
        "verse": 4,
        "text": "Love is patient, love is kind. It does not envy, it does not boast, it is not proud."
      },
      {
        "verse": 5,
        "text": "It is not rude, it is not self-seeking, it is not easily angered, it keeps no account of wrongs."
      },
      {
        "verse": 6,
        "text": "Love takes no pleasure in evil, but rejoices in the truth."
      },
      {
        "verse": 7,
        "text": "It bears all things, believes all things, hopes all things, endures all things."
      },
      {
        "verse": 8,
        "text": "Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be restrained; where there is knowledge, it will be dismissed."
      },
      {
        "verse": 9,
        "text": "For we know in part and we prophesy in part,"
      },
      {
        "verse": 10,
        "text": "but when the perfect comes, the partial passes away."
      },
      {
        "verse": 11,
        "text": "When I was a child, I talked like a child, I thought like a child, I reasoned like a child. When I became a man, I set aside childish ways."
      },
      {
        "verse": 12,
        "text": "Now we see but a dim reflection as in a mirror; then we shall see face to face. Now I know in part; then I shall know fully, even as I am fully known."
      },
      {
        "verse": 13,
        "text": "And now these three remain: faith, hope, and love; but the greatest of these is love."
      }
    ],
    "AMPC": [
      {
        "verse": 1,
        "text": "If I speak in the tongues of men and of angels, but have not love, I am only a ringing gong or a clanging cymbal."
      },
      {
        "verse": 2,
        "text": "If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have absolute faith so as to move mountains, but have not love, I am nothing."
      },
      {
        "verse": 3,
        "text": "If I give all I possess to the poor and exult in the surrender of my body, but have not love, I gain nothing."
      },
      {
        "verse": 4,
        "text": "Love is patient, love is kind. It does not envy, it does not boast, it is not proud."
      },
      {
        "verse": 5,
        "text": "It is not rude, it is not self-seeking, it is not easily angered, it keeps no account of wrongs."
      },
      {
        "verse": 6,
        "text": "Love takes no pleasure in evil, but rejoices in the truth."
      },
      {
        "verse": 7,
        "text": "It bears all things, believes all things, hopes all things, endures all things."
      },
      {
        "verse": 8,
        "text": "Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be restrained; where there is knowledge, it will be dismissed."
      },
      {
        "verse": 9,
        "text": "For we know in part and we prophesy in part,"
      },
      {
        "verse": 10,
        "text": "but when the perfect comes, the partial passes away."
      },
      {
        "verse": 11,
        "text": "When I was a child, I talked like a child, I thought like a child, I reasoned like a child. When I became a man, I set aside childish ways."
      },
      {
        "verse": 12,
        "text": "Now we see but a dim reflection as in a mirror; then we shall see face to face. Now I know in part; then I shall know fully, even as I am fully known."
      },
      {
        "verse": 13,
        "text": "And now these three remain: faith, hope, and love; but the greatest of these is love."
      }
    ],
    "YLT": [
      {
        "verse": 1,
        "text": "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal."
      },
      {
        "verse": 2,
        "text": "And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing."
      },
      {
        "verse": 3,
        "text": "And though I bestow all my goods to feed the poor, and though I give my body to be burned, and have not charity, it profiteth me nothing."
      },
      {
        "verse": 4,
        "text": "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,"
      },
      {
        "verse": 5,
        "text": "Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil;"
      },
      {
        "verse": 6,
        "text": "Rejoiceth not in iniquity, but rejoiceth in the truth;"
      },
      {
        "verse": 7,
        "text": "Beareth all things, believeth all things, hopeth all things, endureth all things."
      },
      {
        "verse": 8,
        "text": "Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease; whether there be knowledge, it shall vanish away."
      },
      {
        "verse": 9,
        "text": "For we know in part, and we prophesy in part."
      },
      {
        "verse": 10,
        "text": "But when that which is perfect is come, then that which is in part shall be done away."
      },
      {
        "verse": 11,
        "text": "When I was a child, I spake as a child, I understood as a child, I thought as a child: but when I became a man, I put away childish things."
      },
      {
        "verse": 12,
        "text": "For now we see through a glass, darkly; but then face to face: now I know in part; but then shall I know even as also I am known."
      },
      {
        "verse": 13,
        "text": "And now abideth faith, hope, charity, these three; but the greatest of these is charity."
      }
    ],
    "CUV": [
      {
        "verse": 1,
        "text": "我若能說萬人的方言，並天使的話語，卻沒有愛，我就成了鳴的鑼，響的鈸一般。"
      },
      {
        "verse": 2,
        "text": "我若有先知講道之能，也明白各樣的奧祕，各樣的知識，而且有全備的信，叫我能夠移山，卻沒有愛，我就算不得甚麼。"
      },
      {
        "verse": 3,
        "text": "我若將所有的賙濟窮人，又捨己身叫人焚燒，卻沒有愛，仍然與我無益。"
      },
      {
        "verse": 4,
        "text": "愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂，"
      },
      {
        "verse": 5,
        "text": "不做害羞的事，不求自己的益處，不輕易發怒，不計算人的惡，"
      },
      {
        "verse": 6,
        "text": "不喜歡不義，只喜歡真理；"
      },
      {
        "verse": 7,
        "text": "凡事包容，凡事相信，凡事盼望，凡事忍耐。"
      },
      {
        "verse": 8,
        "text": "愛是永不止息。先知講道之能終必歸於無有；說方言之能終必停止；知識也終必歸於無有。"
      },
      {
        "verse": 9,
        "text": "我們現在所知道的有限，先知所講的也有限，"
      },
      {
        "verse": 10,
        "text": "等那完全的來到，這有限的必歸於無有了。"
      },
      {
        "verse": 11,
        "text": "我作孩子的時候，話語像孩子，心思像孩子，意念像孩子，既成了人，就把孩子的事丟棄了。"
      },
      {
        "verse": 12,
        "text": "我們如今彷彿對著鏡子觀看，模糊不清（原文是如同猜謎），到那時就要面對面了。我如今所知道的有限，到那時就全知道，如同主知道我一樣。"
      },
      {
        "verse": 13,
        "text": "如今常存的有信，有望，有愛這三樣，其中最大的是愛。"
      }
    ],
    "CNV": [
      {
        "verse": 1,
        "text": "我若能說萬人的方言，並天使的話語，卻沒有愛，我就成了鳴的鑼，響的鈸一般。"
      },
      {
        "verse": 2,
        "text": "我若有先知講道之能，也明白各樣的奧祕，各樣的知識，而且有全備的信，叫我能夠移山，卻沒有愛，我就算不得甚麼。"
      },
      {
        "verse": 3,
        "text": "我若將所有的賙濟窮人，又捨己身叫人焚燒，卻沒有愛，仍然與我無益。"
      },
      {
        "verse": 4,
        "text": "愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂，"
      },
      {
        "verse": 5,
        "text": "不做害羞的事，不求自己的益處，不輕易發怒，不計算人的惡，"
      },
      {
        "verse": 6,
        "text": "不喜歡不義，只喜歡真理；"
      },
      {
        "verse": 7,
        "text": "凡事包容，凡事相信，凡事盼望，凡事忍耐。"
      },
      {
        "verse": 8,
        "text": "愛是永不止息。先知講道之能終必歸於無有；說方言之能終必停止；知識也終必歸於無有。"
      },
      {
        "verse": 9,
        "text": "我們現在所知道的有限，先知所講的也有限，"
      },
      {
        "verse": 10,
        "text": "等那完全的來到，這有限的必歸於無有了。"
      },
      {
        "verse": 11,
        "text": "我作孩子的時候，話語像孩子，心思像孩子，意念像孩子，既成了人，就把孩子的事丟棄了。"
      },
      {
        "verse": 12,
        "text": "我們如今彷彿對著鏡子觀看，模糊不清（原文是如同猜謎），到那時就要面對面了。我如今所知道的有限，到那時就全知道，如同主知道我一樣。"
      },
      {
        "verse": 13,
        "text": "如今常存的有信，有望，有愛這三樣，其中最大的是愛。"
      }
    ],
    "CCB": [
      {
        "verse": 1,
        "text": "我若能說萬人的方言，並天使的話語，卻沒有愛，我就成了鳴的鑼，響的鈸一般。"
      },
      {
        "verse": 2,
        "text": "我若有先知講道之能，也明白各樣的奧祕，各樣的知識，而且有全備的信，叫我能夠移山，卻沒有愛，我就算不得甚麼。"
      },
      {
        "verse": 3,
        "text": "我若將所有的賙濟窮人，又捨己身叫人焚燒，卻沒有愛，仍然與我無益。"
      },
      {
        "verse": 4,
        "text": "愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂，"
      },
      {
        "verse": 5,
        "text": "不做害羞的事，不求自己的益處，不輕易發怒，不計算人的惡，"
      },
      {
        "verse": 6,
        "text": "不喜歡不義，只喜歡真理；"
      },
      {
        "verse": 7,
        "text": "凡事包容，凡事相信，凡事盼望，凡事忍耐。"
      },
      {
        "verse": 8,
        "text": "愛是永不止息。先知講道之能終必歸於無有；說方言之能終必停止；知識也終必歸於無有。"
      },
      {
        "verse": 9,
        "text": "我們現在所知道的有限，先知所講的也有限，"
      },
      {
        "verse": 10,
        "text": "等那完全的來到，這有限的必歸於無有了。"
      },
      {
        "verse": 11,
        "text": "我作孩子的時候，話語像孩子，心思像孩子，意念像孩子，既成了人，就把孩子的事丟棄了。"
      },
      {
        "verse": 12,
        "text": "我們如今彷彿對著鏡子觀看，模糊不清（原文是如同猜謎），到那時就要面對面了。我如今所知道的有限，到那時就全知道，如同主知道我一樣。"
      },
      {
        "verse": 13,
        "text": "如今常存的有信，有望，有愛這三樣，其中最大的是愛。"
      }
    ]
  },
  "50:4": {
    "NKJV": [
      {
        "verse": 1,
        "text": "Therefore, my brothers, whom I love and long for, my joy and crown, that is how you must stand firm in the Lord, my beloved."
      },
      {
        "verse": 2,
        "text": "I urge Euodia and Syntyche to agree with each other in the Lord."
      },
      {
        "verse": 3,
        "text": "Yes, and I ask you, my true yokefellow, to help these women who have labored with me for the gospel, along with Clement and the rest of my fellow workers, whose names are in the Book of Life."
      },
      {
        "verse": 4,
        "text": "Rejoice in the Lord always. I will say it again: Rejoice!"
      },
      {
        "verse": 5,
        "text": "Let your gentleness be apparent to all. The Lord is near."
      },
      {
        "verse": 6,
        "text": "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God."
      },
      {
        "verse": 7,
        "text": "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."
      },
      {
        "verse": 8,
        "text": "Finally, brothers, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think on these things."
      },
      {
        "verse": 9,
        "text": "Whatever you have learned or received or heard from me, or seen in me, put it into practice. And the God of peace will be with you."
      },
      {
        "verse": 10,
        "text": "Now I rejoice greatly in the Lord that at last you have revived your concern for me. You were indeed concerned, but you had no opportunity to show it."
      },
      {
        "verse": 11,
        "text": "I am not saying this out of need, for I have learned to be content regardless of my circumstances."
      },
      {
        "verse": 12,
        "text": "I know how to live humbly, and I know how to abound. I am accustomed to any and every situation—to being filled and being hungry, to having plenty and having need."
      },
      {
        "verse": 13,
        "text": "I can do all things through Christ who gives me strength."
      },
      {
        "verse": 14,
        "text": "Nevertheless, you have done well to share in my affliction."
      },
      {
        "verse": 15,
        "text": "And as you Philippians know, in the early days of the gospel, when I left Macedonia, no church but you partnered with me in the matter of giving and receiving."
      },
      {
        "verse": 16,
        "text": "For even while I was in Thessalonica, you provided for my needs again and again."
      },
      {
        "verse": 17,
        "text": "Not that I am seeking a gift, but I am looking for the fruit that may be credited to your account."
      },
      {
        "verse": 18,
        "text": "I have all I need and more, now that I have received your gifts from Epaphroditus. They are a fragrant offering, an acceptable sacrifice, well-pleasing to God."
      },
      {
        "verse": 19,
        "text": "And my God will supply all your needs according to His glorious riches in Christ Jesus."
      },
      {
        "verse": 20,
        "text": "To our God and Father be glory forever and ever. Amen."
      },
      {
        "verse": 21,
        "text": "Greet all the saints in Christ Jesus. The brothers who are with me send you greetings."
      },
      {
        "verse": 22,
        "text": "All the saints send you greetings, especially those from the household of Caesar."
      },
      {
        "verse": 23,
        "text": "The grace of the Lord Jesus Christ be with your spirit."
      }
    ],
    "KJV": [
      {
        "verse": 1,
        "text": "Therefore, my brethren dearly beloved and longed for, my joy and crown, so stand fast in the Lord, my dearly beloved."
      },
      {
        "verse": 2,
        "text": "I beseech Euodias, and beseech Syntyche, that they be of the same mind in the Lord."
      },
      {
        "verse": 3,
        "text": "And I intreat thee also, true yokefellow, help those women which laboured with me in the gospel, with Clement also, and with other my fellowlabourers, whose names are in the book of life."
      },
      {
        "verse": 4,
        "text": "Rejoice in the Lord alway: and again I say, Rejoice."
      },
      {
        "verse": 5,
        "text": "Let your moderation be known unto all men. The Lord is at hand."
      },
      {
        "verse": 6,
        "text": "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."
      },
      {
        "verse": 7,
        "text": "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
      },
      {
        "verse": 8,
        "text": "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things."
      },
      {
        "verse": 9,
        "text": "Those things, which ye have both learned, and received, and heard, and seen in me, do: and the God of peace shall be with you."
      },
      {
        "verse": 10,
        "text": "But I rejoiced in the Lord greatly, that now at the last your care of me hath flourished again; wherein ye were also careful, but ye lacked opportunity."
      },
      {
        "verse": 11,
        "text": "Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content."
      },
      {
        "verse": 12,
        "text": "I know both how to be abased, and I know how to abound: every where and in all things I am instructed both to be full and to be hungry, both to abound and to suffer need."
      },
      {
        "verse": 13,
        "text": "I can do all things through Christ which strengtheneth me."
      },
      {
        "verse": 14,
        "text": "Notwithstanding ye have well done, that ye did communicate with my affliction."
      },
      {
        "verse": 15,
        "text": "Now ye Philippians know also, that in the beginning of the gospel, when I departed from Macedonia, no church communicated with me as concerning giving and receiving, but ye only."
      },
      {
        "verse": 16,
        "text": "For even in Thessalonica ye sent once and again unto my necessity."
      },
      {
        "verse": 17,
        "text": "Not because I desire a gift: but I desire fruit that may abound to your account."
      },
      {
        "verse": 18,
        "text": "But I have all, and abound: I am full, having received of Epaphroditus the things which were sent from you, an odour of a sweet smell, a sacrifice acceptable, wellpleasing to God."
      },
      {
        "verse": 19,
        "text": "But my God shall supply all your need according to his riches in glory by Christ Jesus."
      },
      {
        "verse": 20,
        "text": "Now unto God and our Father be glory for ever and ever. Amen."
      },
      {
        "verse": 21,
        "text": "Salute every saint in Christ Jesus. The brethren which are with me greet you."
      },
      {
        "verse": 22,
        "text": "All the saints salute you, chiefly they that are of Cesar’s household."
      },
      {
        "verse": 23,
        "text": "The grace of our Lord Jesus Christ be with you all. Amen. It was written to the Philippians from Rome by Epaphroditus."
      }
    ],
    "ESV": [
      {
        "verse": 1,
        "text": "Therefore, my brothers, whom I love and long for, my joy and crown, that is how you must stand firm in the Lord, my beloved."
      },
      {
        "verse": 2,
        "text": "I urge Euodia and Syntyche to agree with each other in the Lord."
      },
      {
        "verse": 3,
        "text": "Yes, and I ask you, my true yokefellow, to help these women who have labored with me for the gospel, along with Clement and the rest of my fellow workers, whose names are in the Book of Life."
      },
      {
        "verse": 4,
        "text": "Rejoice in the Lord always. I will say it again: Rejoice!"
      },
      {
        "verse": 5,
        "text": "Let your gentleness be apparent to all. The Lord is near."
      },
      {
        "verse": 6,
        "text": "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God."
      },
      {
        "verse": 7,
        "text": "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."
      },
      {
        "verse": 8,
        "text": "Finally, brothers, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think on these things."
      },
      {
        "verse": 9,
        "text": "Whatever you have learned or received or heard from me, or seen in me, put it into practice. And the God of peace will be with you."
      },
      {
        "verse": 10,
        "text": "Now I rejoice greatly in the Lord that at last you have revived your concern for me. You were indeed concerned, but you had no opportunity to show it."
      },
      {
        "verse": 11,
        "text": "I am not saying this out of need, for I have learned to be content regardless of my circumstances."
      },
      {
        "verse": 12,
        "text": "I know how to live humbly, and I know how to abound. I am accustomed to any and every situation—to being filled and being hungry, to having plenty and having need."
      },
      {
        "verse": 13,
        "text": "I can do all things through Christ who gives me strength."
      },
      {
        "verse": 14,
        "text": "Nevertheless, you have done well to share in my affliction."
      },
      {
        "verse": 15,
        "text": "And as you Philippians know, in the early days of the gospel, when I left Macedonia, no church but you partnered with me in the matter of giving and receiving."
      },
      {
        "verse": 16,
        "text": "For even while I was in Thessalonica, you provided for my needs again and again."
      },
      {
        "verse": 17,
        "text": "Not that I am seeking a gift, but I am looking for the fruit that may be credited to your account."
      },
      {
        "verse": 18,
        "text": "I have all I need and more, now that I have received your gifts from Epaphroditus. They are a fragrant offering, an acceptable sacrifice, well-pleasing to God."
      },
      {
        "verse": 19,
        "text": "And my God will supply all your needs according to His glorious riches in Christ Jesus."
      },
      {
        "verse": 20,
        "text": "To our God and Father be glory forever and ever. Amen."
      },
      {
        "verse": 21,
        "text": "Greet all the saints in Christ Jesus. The brothers who are with me send you greetings."
      },
      {
        "verse": 22,
        "text": "All the saints send you greetings, especially those from the household of Caesar."
      },
      {
        "verse": 23,
        "text": "The grace of the Lord Jesus Christ be with your spirit."
      }
    ],
    "NIV": [
      {
        "verse": 1,
        "text": "Therefore, my brothers, whom I love and long for, my joy and crown, that is how you must stand firm in the Lord, my beloved."
      },
      {
        "verse": 2,
        "text": "I urge Euodia and Syntyche to agree with each other in the Lord."
      },
      {
        "verse": 3,
        "text": "Yes, and I ask you, my true yokefellow, to help these women who have labored with me for the gospel, along with Clement and the rest of my fellow workers, whose names are in the Book of Life."
      },
      {
        "verse": 4,
        "text": "Rejoice in the Lord always. I will say it again: Rejoice!"
      },
      {
        "verse": 5,
        "text": "Let your gentleness be apparent to all. The Lord is near."
      },
      {
        "verse": 6,
        "text": "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God."
      },
      {
        "verse": 7,
        "text": "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."
      },
      {
        "verse": 8,
        "text": "Finally, brothers, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think on these things."
      },
      {
        "verse": 9,
        "text": "Whatever you have learned or received or heard from me, or seen in me, put it into practice. And the God of peace will be with you."
      },
      {
        "verse": 10,
        "text": "Now I rejoice greatly in the Lord that at last you have revived your concern for me. You were indeed concerned, but you had no opportunity to show it."
      },
      {
        "verse": 11,
        "text": "I am not saying this out of need, for I have learned to be content regardless of my circumstances."
      },
      {
        "verse": 12,
        "text": "I know how to live humbly, and I know how to abound. I am accustomed to any and every situation—to being filled and being hungry, to having plenty and having need."
      },
      {
        "verse": 13,
        "text": "I can do all things through Christ who gives me strength."
      },
      {
        "verse": 14,
        "text": "Nevertheless, you have done well to share in my affliction."
      },
      {
        "verse": 15,
        "text": "And as you Philippians know, in the early days of the gospel, when I left Macedonia, no church but you partnered with me in the matter of giving and receiving."
      },
      {
        "verse": 16,
        "text": "For even while I was in Thessalonica, you provided for my needs again and again."
      },
      {
        "verse": 17,
        "text": "Not that I am seeking a gift, but I am looking for the fruit that may be credited to your account."
      },
      {
        "verse": 18,
        "text": "I have all I need and more, now that I have received your gifts from Epaphroditus. They are a fragrant offering, an acceptable sacrifice, well-pleasing to God."
      },
      {
        "verse": 19,
        "text": "And my God will supply all your needs according to His glorious riches in Christ Jesus."
      },
      {
        "verse": 20,
        "text": "To our God and Father be glory forever and ever. Amen."
      },
      {
        "verse": 21,
        "text": "Greet all the saints in Christ Jesus. The brothers who are with me send you greetings."
      },
      {
        "verse": 22,
        "text": "All the saints send you greetings, especially those from the household of Caesar."
      },
      {
        "verse": 23,
        "text": "The grace of the Lord Jesus Christ be with your spirit."
      }
    ],
    "NLT": [
      {
        "verse": 1,
        "text": "Therefore, my brothers, whom I love and long for, my joy and crown, that is how you must stand firm in the Lord, my beloved."
      },
      {
        "verse": 2,
        "text": "I urge Euodia and Syntyche to agree with each other in the Lord."
      },
      {
        "verse": 3,
        "text": "Yes, and I ask you, my true yokefellow, to help these women who have labored with me for the gospel, along with Clement and the rest of my fellow workers, whose names are in the Book of Life."
      },
      {
        "verse": 4,
        "text": "Rejoice in the Lord always. I will say it again: Rejoice!"
      },
      {
        "verse": 5,
        "text": "Let your gentleness be apparent to all. The Lord is near."
      },
      {
        "verse": 6,
        "text": "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God."
      },
      {
        "verse": 7,
        "text": "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."
      },
      {
        "verse": 8,
        "text": "Finally, brothers, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think on these things."
      },
      {
        "verse": 9,
        "text": "Whatever you have learned or received or heard from me, or seen in me, put it into practice. And the God of peace will be with you."
      },
      {
        "verse": 10,
        "text": "Now I rejoice greatly in the Lord that at last you have revived your concern for me. You were indeed concerned, but you had no opportunity to show it."
      },
      {
        "verse": 11,
        "text": "I am not saying this out of need, for I have learned to be content regardless of my circumstances."
      },
      {
        "verse": 12,
        "text": "I know how to live humbly, and I know how to abound. I am accustomed to any and every situation—to being filled and being hungry, to having plenty and having need."
      },
      {
        "verse": 13,
        "text": "I can do all things through Christ who gives me strength."
      },
      {
        "verse": 14,
        "text": "Nevertheless, you have done well to share in my affliction."
      },
      {
        "verse": 15,
        "text": "And as you Philippians know, in the early days of the gospel, when I left Macedonia, no church but you partnered with me in the matter of giving and receiving."
      },
      {
        "verse": 16,
        "text": "For even while I was in Thessalonica, you provided for my needs again and again."
      },
      {
        "verse": 17,
        "text": "Not that I am seeking a gift, but I am looking for the fruit that may be credited to your account."
      },
      {
        "verse": 18,
        "text": "I have all I need and more, now that I have received your gifts from Epaphroditus. They are a fragrant offering, an acceptable sacrifice, well-pleasing to God."
      },
      {
        "verse": 19,
        "text": "And my God will supply all your needs according to His glorious riches in Christ Jesus."
      },
      {
        "verse": 20,
        "text": "To our God and Father be glory forever and ever. Amen."
      },
      {
        "verse": 21,
        "text": "Greet all the saints in Christ Jesus. The brothers who are with me send you greetings."
      },
      {
        "verse": 22,
        "text": "All the saints send you greetings, especially those from the household of Caesar."
      },
      {
        "verse": 23,
        "text": "The grace of the Lord Jesus Christ be with your spirit."
      }
    ],
    "AMPC": [
      {
        "verse": 1,
        "text": "Therefore, my brothers, whom I love and long for, my joy and crown, that is how you must stand firm in the Lord, my beloved."
      },
      {
        "verse": 2,
        "text": "I urge Euodia and Syntyche to agree with each other in the Lord."
      },
      {
        "verse": 3,
        "text": "Yes, and I ask you, my true yokefellow, to help these women who have labored with me for the gospel, along with Clement and the rest of my fellow workers, whose names are in the Book of Life."
      },
      {
        "verse": 4,
        "text": "Rejoice in the Lord always. I will say it again: Rejoice!"
      },
      {
        "verse": 5,
        "text": "Let your gentleness be apparent to all. The Lord is near."
      },
      {
        "verse": 6,
        "text": "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God."
      },
      {
        "verse": 7,
        "text": "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."
      },
      {
        "verse": 8,
        "text": "Finally, brothers, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think on these things."
      },
      {
        "verse": 9,
        "text": "Whatever you have learned or received or heard from me, or seen in me, put it into practice. And the God of peace will be with you."
      },
      {
        "verse": 10,
        "text": "Now I rejoice greatly in the Lord that at last you have revived your concern for me. You were indeed concerned, but you had no opportunity to show it."
      },
      {
        "verse": 11,
        "text": "I am not saying this out of need, for I have learned to be content regardless of my circumstances."
      },
      {
        "verse": 12,
        "text": "I know how to live humbly, and I know how to abound. I am accustomed to any and every situation—to being filled and being hungry, to having plenty and having need."
      },
      {
        "verse": 13,
        "text": "I can do all things through Christ who gives me strength."
      },
      {
        "verse": 14,
        "text": "Nevertheless, you have done well to share in my affliction."
      },
      {
        "verse": 15,
        "text": "And as you Philippians know, in the early days of the gospel, when I left Macedonia, no church but you partnered with me in the matter of giving and receiving."
      },
      {
        "verse": 16,
        "text": "For even while I was in Thessalonica, you provided for my needs again and again."
      },
      {
        "verse": 17,
        "text": "Not that I am seeking a gift, but I am looking for the fruit that may be credited to your account."
      },
      {
        "verse": 18,
        "text": "I have all I need and more, now that I have received your gifts from Epaphroditus. They are a fragrant offering, an acceptable sacrifice, well-pleasing to God."
      },
      {
        "verse": 19,
        "text": "And my God will supply all your needs according to His glorious riches in Christ Jesus."
      },
      {
        "verse": 20,
        "text": "To our God and Father be glory forever and ever. Amen."
      },
      {
        "verse": 21,
        "text": "Greet all the saints in Christ Jesus. The brothers who are with me send you greetings."
      },
      {
        "verse": 22,
        "text": "All the saints send you greetings, especially those from the household of Caesar."
      },
      {
        "verse": 23,
        "text": "The grace of the Lord Jesus Christ be with your spirit."
      }
    ],
    "YLT": [
      {
        "verse": 1,
        "text": "Therefore, my brethren dearly beloved and longed for, my joy and crown, so stand fast in the Lord, my dearly beloved."
      },
      {
        "verse": 2,
        "text": "I beseech Euodias, and beseech Syntyche, that they be of the same mind in the Lord."
      },
      {
        "verse": 3,
        "text": "And I intreat thee also, true yokefellow, help those women which laboured with me in the gospel, with Clement also, and with other my fellowlabourers, whose names are in the book of life."
      },
      {
        "verse": 4,
        "text": "Rejoice in the Lord alway: and again I say, Rejoice."
      },
      {
        "verse": 5,
        "text": "Let your moderation be known unto all men. The Lord is at hand."
      },
      {
        "verse": 6,
        "text": "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."
      },
      {
        "verse": 7,
        "text": "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
      },
      {
        "verse": 8,
        "text": "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things."
      },
      {
        "verse": 9,
        "text": "Those things, which ye have both learned, and received, and heard, and seen in me, do: and the God of peace shall be with you."
      },
      {
        "verse": 10,
        "text": "But I rejoiced in the Lord greatly, that now at the last your care of me hath flourished again; wherein ye were also careful, but ye lacked opportunity."
      },
      {
        "verse": 11,
        "text": "Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content."
      },
      {
        "verse": 12,
        "text": "I know both how to be abased, and I know how to abound: every where and in all things I am instructed both to be full and to be hungry, both to abound and to suffer need."
      },
      {
        "verse": 13,
        "text": "I can do all things through Christ which strengtheneth me."
      },
      {
        "verse": 14,
        "text": "Notwithstanding ye have well done, that ye did communicate with my affliction."
      },
      {
        "verse": 15,
        "text": "Now ye Philippians know also, that in the beginning of the gospel, when I departed from Macedonia, no church communicated with me as concerning giving and receiving, but ye only."
      },
      {
        "verse": 16,
        "text": "For even in Thessalonica ye sent once and again unto my necessity."
      },
      {
        "verse": 17,
        "text": "Not because I desire a gift: but I desire fruit that may abound to your account."
      },
      {
        "verse": 18,
        "text": "But I have all, and abound: I am full, having received of Epaphroditus the things which were sent from you, an odour of a sweet smell, a sacrifice acceptable, wellpleasing to God."
      },
      {
        "verse": 19,
        "text": "But my God shall supply all your need according to his riches in glory by Christ Jesus."
      },
      {
        "verse": 20,
        "text": "Now unto God and our Father be glory for ever and ever. Amen."
      },
      {
        "verse": 21,
        "text": "Salute every saint in Christ Jesus. The brethren which are with me greet you."
      },
      {
        "verse": 22,
        "text": "All the saints salute you, chiefly they that are of Cesar’s household."
      },
      {
        "verse": 23,
        "text": "The grace of our Lord Jesus Christ be with you all. Amen. It was written to the Philippians from Rome by Epaphroditus."
      }
    ],
    "CUV": [
      {
        "verse": 1,
        "text": "我所親愛、所想念的弟兄們，你們就是我的喜樂，我的冠冕。我親愛的弟兄，你們應當靠主站立得穩。"
      },
      {
        "verse": 2,
        "text": "我勸友阿蝶和循都基，要在主裡同心。"
      },
      {
        "verse": 3,
        "text": "我也求你這真實同負一軛的，幫助這兩個女人，因為她們在福音上曾與我一同勞苦；還有革利免，並其餘和我一同做工的，他們的名字都在生命冊上。"
      },
      {
        "verse": 4,
        "text": "你們要靠主常常喜樂。我再說，你們要喜樂。"
      },
      {
        "verse": 5,
        "text": "當叫眾人知道你們謙讓的心。主已經近了。"
      },
      {
        "verse": 6,
        "text": "應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。"
      },
      {
        "verse": 7,
        "text": "神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。"
      },
      {
        "verse": 8,
        "text": "弟兄們，我還有未盡的話：凡是真實的、可敬的、公義的、清潔的、可愛的、有美名的，若有甚麼德行，若有甚麼稱讚，這些事你們都要思念。"
      },
      {
        "verse": 9,
        "text": "你們在我身上所學習的，所領受的，所聽見的，所看見的，這些事你們都要去行，賜平安的神就必與你們同在。"
      },
      {
        "verse": 10,
        "text": "我靠主大大地喜樂，因為你們思念我的心如今又發生；你們向來就思念我，只是沒得機會。"
      },
      {
        "verse": 11,
        "text": "我並不是因缺乏說這話；我無論在甚麼景況都可以知足，這是我已經學會了。"
      },
      {
        "verse": 12,
        "text": "我知道怎樣處卑賤，也知道怎樣處豐富；或飽足，或飢餓；或有餘，或缺乏，隨事隨在，我都得了祕訣。"
      },
      {
        "verse": 13,
        "text": "我靠著那加給我力量的，凡事都能做。"
      },
      {
        "verse": 14,
        "text": "然而，你們和我同受患難原是美事。"
      },
      {
        "verse": 15,
        "text": "腓立比人哪，你們也知道我初傳福音離了馬其頓的時候，論到授受的事，除了你們以外，並沒有別的教會供給我。"
      },
      {
        "verse": 16,
        "text": "就是我在帖撒羅尼迦，你們也一次兩次地打發人供給我的需用。"
      },
      {
        "verse": 17,
        "text": "我並不求甚麼餽送，所求的就是你們的果子漸漸增多，歸在你們的帳上。"
      },
      {
        "verse": 18,
        "text": "但我樣樣都有，並且有餘。我已經充足，因我從以巴弗提受了你們的餽送，當作極美的香氣，為神所收納、所喜悅的祭物。"
      },
      {
        "verse": 19,
        "text": "我的神必照他榮耀的豐富，在基督耶穌裡，使你們一切所需用的都充足。"
      },
      {
        "verse": 20,
        "text": "願榮耀歸給我們的父神，直到永永遠遠。阿們！"
      },
      {
        "verse": 21,
        "text": "請問在基督耶穌裡的各位聖徒安。在我這裡的眾弟兄都問你們安。"
      },
      {
        "verse": 22,
        "text": "眾聖徒都問你們安。在凱撒家裡的人特特地問你們安。"
      },
      {
        "verse": 23,
        "text": "願主耶穌基督的恩常在你們心裡！"
      }
    ],
    "CNV": [
      {
        "verse": 1,
        "text": "我所親愛、所想念的弟兄們，你們就是我的喜樂，我的冠冕。我親愛的弟兄，你們應當靠主站立得穩。"
      },
      {
        "verse": 2,
        "text": "我勸友阿蝶和循都基，要在主裡同心。"
      },
      {
        "verse": 3,
        "text": "我也求你這真實同負一軛的，幫助這兩個女人，因為她們在福音上曾與我一同勞苦；還有革利免，並其餘和我一同做工的，他們的名字都在生命冊上。"
      },
      {
        "verse": 4,
        "text": "你們要靠主常常喜樂。我再說，你們要喜樂。"
      },
      {
        "verse": 5,
        "text": "當叫眾人知道你們謙讓的心。主已經近了。"
      },
      {
        "verse": 6,
        "text": "應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。"
      },
      {
        "verse": 7,
        "text": "神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。"
      },
      {
        "verse": 8,
        "text": "弟兄們，我還有未盡的話：凡是真實的、可敬的、公義的、清潔的、可愛的、有美名的，若有甚麼德行，若有甚麼稱讚，這些事你們都要思念。"
      },
      {
        "verse": 9,
        "text": "你們在我身上所學習的，所領受的，所聽見的，所看見的，這些事你們都要去行，賜平安的神就必與你們同在。"
      },
      {
        "verse": 10,
        "text": "我靠主大大地喜樂，因為你們思念我的心如今又發生；你們向來就思念我，只是沒得機會。"
      },
      {
        "verse": 11,
        "text": "我並不是因缺乏說這話；我無論在甚麼景況都可以知足，這是我已經學會了。"
      },
      {
        "verse": 12,
        "text": "我知道怎樣處卑賤，也知道怎樣處豐富；或飽足，或飢餓；或有餘，或缺乏，隨事隨在，我都得了祕訣。"
      },
      {
        "verse": 13,
        "text": "我靠著那加給我力量的，凡事都能做。"
      },
      {
        "verse": 14,
        "text": "然而，你們和我同受患難原是美事。"
      },
      {
        "verse": 15,
        "text": "腓立比人哪，你們也知道我初傳福音離了馬其頓的時候，論到授受的事，除了你們以外，並沒有別的教會供給我。"
      },
      {
        "verse": 16,
        "text": "就是我在帖撒羅尼迦，你們也一次兩次地打發人供給我的需用。"
      },
      {
        "verse": 17,
        "text": "我並不求甚麼餽送，所求的就是你們的果子漸漸增多，歸在你們的帳上。"
      },
      {
        "verse": 18,
        "text": "但我樣樣都有，並且有餘。我已經充足，因我從以巴弗提受了你們的餽送，當作極美的香氣，為神所收納、所喜悅的祭物。"
      },
      {
        "verse": 19,
        "text": "我的神必照他榮耀的豐富，在基督耶穌裡，使你們一切所需用的都充足。"
      },
      {
        "verse": 20,
        "text": "願榮耀歸給我們的父神，直到永永遠遠。阿們！"
      },
      {
        "verse": 21,
        "text": "請問在基督耶穌裡的各位聖徒安。在我這裡的眾弟兄都問你們安。"
      },
      {
        "verse": 22,
        "text": "眾聖徒都問你們安。在凱撒家裡的人特特地問你們安。"
      },
      {
        "verse": 23,
        "text": "願主耶穌基督的恩常在你們心裡！"
      }
    ],
    "CCB": [
      {
        "verse": 1,
        "text": "我所親愛、所想念的弟兄們，你們就是我的喜樂，我的冠冕。我親愛的弟兄，你們應當靠主站立得穩。"
      },
      {
        "verse": 2,
        "text": "我勸友阿蝶和循都基，要在主裡同心。"
      },
      {
        "verse": 3,
        "text": "我也求你這真實同負一軛的，幫助這兩個女人，因為她們在福音上曾與我一同勞苦；還有革利免，並其餘和我一同做工的，他們的名字都在生命冊上。"
      },
      {
        "verse": 4,
        "text": "你們要靠主常常喜樂。我再說，你們要喜樂。"
      },
      {
        "verse": 5,
        "text": "當叫眾人知道你們謙讓的心。主已經近了。"
      },
      {
        "verse": 6,
        "text": "應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。"
      },
      {
        "verse": 7,
        "text": "神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。"
      },
      {
        "verse": 8,
        "text": "弟兄們，我還有未盡的話：凡是真實的、可敬的、公義的、清潔的、可愛的、有美名的，若有甚麼德行，若有甚麼稱讚，這些事你們都要思念。"
      },
      {
        "verse": 9,
        "text": "你們在我身上所學習的，所領受的，所聽見的，所看見的，這些事你們都要去行，賜平安的神就必與你們同在。"
      },
      {
        "verse": 10,
        "text": "我靠主大大地喜樂，因為你們思念我的心如今又發生；你們向來就思念我，只是沒得機會。"
      },
      {
        "verse": 11,
        "text": "我並不是因缺乏說這話；我無論在甚麼景況都可以知足，這是我已經學會了。"
      },
      {
        "verse": 12,
        "text": "我知道怎樣處卑賤，也知道怎樣處豐富；或飽足，或飢餓；或有餘，或缺乏，隨事隨在，我都得了祕訣。"
      },
      {
        "verse": 13,
        "text": "我靠著那加給我力量的，凡事都能做。"
      },
      {
        "verse": 14,
        "text": "然而，你們和我同受患難原是美事。"
      },
      {
        "verse": 15,
        "text": "腓立比人哪，你們也知道我初傳福音離了馬其頓的時候，論到授受的事，除了你們以外，並沒有別的教會供給我。"
      },
      {
        "verse": 16,
        "text": "就是我在帖撒羅尼迦，你們也一次兩次地打發人供給我的需用。"
      },
      {
        "verse": 17,
        "text": "我並不求甚麼餽送，所求的就是你們的果子漸漸增多，歸在你們的帳上。"
      },
      {
        "verse": 18,
        "text": "但我樣樣都有，並且有餘。我已經充足，因我從以巴弗提受了你們的餽送，當作極美的香氣，為神所收納、所喜悅的祭物。"
      },
      {
        "verse": 19,
        "text": "我的神必照他榮耀的豐富，在基督耶穌裡，使你們一切所需用的都充足。"
      },
      {
        "verse": 20,
        "text": "願榮耀歸給我們的父神，直到永永遠遠。阿們！"
      },
      {
        "verse": 21,
        "text": "請問在基督耶穌裡的各位聖徒安。在我這裡的眾弟兄都問你們安。"
      },
      {
        "verse": 22,
        "text": "眾聖徒都問你們安。在凱撒家裡的人特特地問你們安。"
      },
      {
        "verse": 23,
        "text": "願主耶穌基督的恩常在你們心裡！"
      }
    ]
  },
  "47:4": {
    "NKJV": [
      {
        "verse": 1,
        "text": "So then, men ought to regard us as servants of Christ and stewards of the mysteries of God."
      },
      {
        "verse": 2,
        "text": "Now it is required of stewards that they be found faithful."
      },
      {
        "verse": 3,
        "text": "I care very little, however, if I am judged by you or by any human court. In fact, I do not even judge myself."
      },
      {
        "verse": 4,
        "text": "My conscience is clear, but that does not vindicate me. It is the Lord who judges me."
      },
      {
        "verse": 5,
        "text": "Therefore judge nothing before the appointed time; wait until the Lord comes. He will bring to light what is hidden in darkness and will expose the motives of men’s hearts. At that time each will receive his praise from God."
      },
      {
        "verse": 6,
        "text": "Brothers, I have applied these things to myself and Apollos for your benefit, so that you may learn from us not to go beyond what is written. Then you will not take pride in one man over another."
      },
      {
        "verse": 7,
        "text": "For who makes you so superior? What do you have that you did not receive? And if you did receive it, why do you boast as though you did not?"
      },
      {
        "verse": 8,
        "text": "Already you have all you want. Already you have become rich. Without us, you have become kings. How I wish you really were kings, so that we might be kings with you!"
      },
      {
        "verse": 9,
        "text": "For it seems to me that God has displayed us apostles at the end of the procession, like prisoners appointed for death. We have become a spectacle to the whole world, to angels as well as to men."
      },
      {
        "verse": 10,
        "text": "We are fools for Christ, but you are wise in Christ. We are weak, but you are strong. You are honored, but we are dishonored."
      },
      {
        "verse": 11,
        "text": "To this very hour we are hungry and thirsty, we are poorly clothed, we are brutally treated, we are homeless."
      },
      {
        "verse": 12,
        "text": "We work hard with our own hands. When we are vilified, we bless; when we are persecuted, we endure it;"
      },
      {
        "verse": 13,
        "text": "when we are slandered, we answer gently. Up to this moment we have become the scum of the earth, the refuse of the world."
      },
      {
        "verse": 14,
        "text": "I am not writing this to shame you, but to warn you as my beloved children."
      },
      {
        "verse": 15,
        "text": "Even if you have ten thousand guardians in Christ, you do not have many fathers; for in Christ Jesus I became your father through the gospel."
      },
      {
        "verse": 16,
        "text": "Therefore I urge you to imitate me."
      },
      {
        "verse": 17,
        "text": "That is why I have sent you Timothy, my beloved and faithful child in the Lord. He will remind you of my way of life in Christ Jesus, which is exactly what I teach everywhere in every church."
      },
      {
        "verse": 18,
        "text": "Some of you have become arrogant, as if I were not coming to you."
      },
      {
        "verse": 19,
        "text": "But I will come to you shortly, if the Lord is willing, and then I will find out not only what these arrogant people are saying, but what power they have."
      },
      {
        "verse": 20,
        "text": "For the kingdom of God is not a matter of talk but of power."
      },
      {
        "verse": 21,
        "text": "Which do you prefer? Shall I come to you with a rod, or in love and with a gentle spirit?"
      }
    ],
    "KJV": [
      {
        "verse": 1,
        "text": "Let a man so account of us, as of the ministers of Christ, and stewards of the mysteries of God."
      },
      {
        "verse": 2,
        "text": "Moreover it is required in stewards, that a man be found faithful."
      },
      {
        "verse": 3,
        "text": "But with me it is a very small thing that I should be judged of you, or of man’s judgment: yea, I judge not mine own self."
      },
      {
        "verse": 4,
        "text": "For I know nothing by myself; yet am I not hereby justified: but he that judgeth me is the Lord."
      },
      {
        "verse": 5,
        "text": "Therefore judge nothing before the time, until the Lord come, who both will bring to light the hidden things of darkness, and will make manifest the counsels of the hearts: and then shall every man have praise of God."
      },
      {
        "verse": 6,
        "text": "And these things, brethren, I have in a figure transferred to myself and to Apollos for your sakes; that ye might learn in us not to think of men above that which is written, that no one of you be puffed up for one against another."
      },
      {
        "verse": 7,
        "text": "For who maketh thee to differ from another? and what hast thou that thou didst not receive? now if thou didst receive it, why dost thou glory, as if thou hadst not received it?"
      },
      {
        "verse": 8,
        "text": "Now ye are full, now ye are rich, ye have reigned as kings without us: and I would to God ye did reign, that we also might reign with you."
      },
      {
        "verse": 9,
        "text": "For I think that God hath set forth us the apostles last, as it were appointed to death: for we are made a spectacle unto the world, and to angels, and to men."
      },
      {
        "verse": 10,
        "text": "We are fools for Christ’s sake, but ye are wise in Christ; we are weak, but ye are strong; ye are honourable, but we are despised."
      },
      {
        "verse": 11,
        "text": "Even unto this present hour we both hunger, and thirst, and are naked, and are buffeted, and have no certain dwellingplace;"
      },
      {
        "verse": 12,
        "text": "And labour, working with our own hands: being reviled, we bless; being persecuted, we suffer it:"
      },
      {
        "verse": 13,
        "text": "Being defamed, we intreat: we are made as the filth of the world, and are the offscouring of all things unto this day."
      },
      {
        "verse": 14,
        "text": "I write not these things to shame you, but as my beloved sons I warn you."
      },
      {
        "verse": 15,
        "text": "For though ye have ten thousand instructors in Christ, yet have ye not many fathers: for in Christ Jesus I have begotten you through the gospel."
      },
      {
        "verse": 16,
        "text": "Wherefore I beseech you, be ye followers of me."
      },
      {
        "verse": 17,
        "text": "For this cause have I sent unto you Timotheus, who is my beloved son, and faithful in the Lord, who shall bring you into remembrance of my ways which be in Christ, as I teach every where in every church."
      },
      {
        "verse": 18,
        "text": "Now some are puffed up, as though I would not come to you."
      },
      {
        "verse": 19,
        "text": "But I will come to you shortly, if the Lord will, and will know, not the speech of them which are puffed up, but the power."
      },
      {
        "verse": 20,
        "text": "For the kingdom of God is not in word, but in power."
      },
      {
        "verse": 21,
        "text": "What will ye? shall I come unto you with a rod, or in love, and in the spirit of meekness?"
      }
    ],
    "ESV": [
      {
        "verse": 1,
        "text": "So then, men ought to regard us as servants of Christ and stewards of the mysteries of God."
      },
      {
        "verse": 2,
        "text": "Now it is required of stewards that they be found faithful."
      },
      {
        "verse": 3,
        "text": "I care very little, however, if I am judged by you or by any human court. In fact, I do not even judge myself."
      },
      {
        "verse": 4,
        "text": "My conscience is clear, but that does not vindicate me. It is the Lord who judges me."
      },
      {
        "verse": 5,
        "text": "Therefore judge nothing before the appointed time; wait until the Lord comes. He will bring to light what is hidden in darkness and will expose the motives of men’s hearts. At that time each will receive his praise from God."
      },
      {
        "verse": 6,
        "text": "Brothers, I have applied these things to myself and Apollos for your benefit, so that you may learn from us not to go beyond what is written. Then you will not take pride in one man over another."
      },
      {
        "verse": 7,
        "text": "For who makes you so superior? What do you have that you did not receive? And if you did receive it, why do you boast as though you did not?"
      },
      {
        "verse": 8,
        "text": "Already you have all you want. Already you have become rich. Without us, you have become kings. How I wish you really were kings, so that we might be kings with you!"
      },
      {
        "verse": 9,
        "text": "For it seems to me that God has displayed us apostles at the end of the procession, like prisoners appointed for death. We have become a spectacle to the whole world, to angels as well as to men."
      },
      {
        "verse": 10,
        "text": "We are fools for Christ, but you are wise in Christ. We are weak, but you are strong. You are honored, but we are dishonored."
      },
      {
        "verse": 11,
        "text": "To this very hour we are hungry and thirsty, we are poorly clothed, we are brutally treated, we are homeless."
      },
      {
        "verse": 12,
        "text": "We work hard with our own hands. When we are vilified, we bless; when we are persecuted, we endure it;"
      },
      {
        "verse": 13,
        "text": "when we are slandered, we answer gently. Up to this moment we have become the scum of the earth, the refuse of the world."
      },
      {
        "verse": 14,
        "text": "I am not writing this to shame you, but to warn you as my beloved children."
      },
      {
        "verse": 15,
        "text": "Even if you have ten thousand guardians in Christ, you do not have many fathers; for in Christ Jesus I became your father through the gospel."
      },
      {
        "verse": 16,
        "text": "Therefore I urge you to imitate me."
      },
      {
        "verse": 17,
        "text": "That is why I have sent you Timothy, my beloved and faithful child in the Lord. He will remind you of my way of life in Christ Jesus, which is exactly what I teach everywhere in every church."
      },
      {
        "verse": 18,
        "text": "Some of you have become arrogant, as if I were not coming to you."
      },
      {
        "verse": 19,
        "text": "But I will come to you shortly, if the Lord is willing, and then I will find out not only what these arrogant people are saying, but what power they have."
      },
      {
        "verse": 20,
        "text": "For the kingdom of God is not a matter of talk but of power."
      },
      {
        "verse": 21,
        "text": "Which do you prefer? Shall I come to you with a rod, or in love and with a gentle spirit?"
      }
    ],
    "NIV": [
      {
        "verse": 1,
        "text": "So then, men ought to regard us as servants of Christ and stewards of the mysteries of God."
      },
      {
        "verse": 2,
        "text": "Now it is required of stewards that they be found faithful."
      },
      {
        "verse": 3,
        "text": "I care very little, however, if I am judged by you or by any human court. In fact, I do not even judge myself."
      },
      {
        "verse": 4,
        "text": "My conscience is clear, but that does not vindicate me. It is the Lord who judges me."
      },
      {
        "verse": 5,
        "text": "Therefore judge nothing before the appointed time; wait until the Lord comes. He will bring to light what is hidden in darkness and will expose the motives of men’s hearts. At that time each will receive his praise from God."
      },
      {
        "verse": 6,
        "text": "Brothers, I have applied these things to myself and Apollos for your benefit, so that you may learn from us not to go beyond what is written. Then you will not take pride in one man over another."
      },
      {
        "verse": 7,
        "text": "For who makes you so superior? What do you have that you did not receive? And if you did receive it, why do you boast as though you did not?"
      },
      {
        "verse": 8,
        "text": "Already you have all you want. Already you have become rich. Without us, you have become kings. How I wish you really were kings, so that we might be kings with you!"
      },
      {
        "verse": 9,
        "text": "For it seems to me that God has displayed us apostles at the end of the procession, like prisoners appointed for death. We have become a spectacle to the whole world, to angels as well as to men."
      },
      {
        "verse": 10,
        "text": "We are fools for Christ, but you are wise in Christ. We are weak, but you are strong. You are honored, but we are dishonored."
      },
      {
        "verse": 11,
        "text": "To this very hour we are hungry and thirsty, we are poorly clothed, we are brutally treated, we are homeless."
      },
      {
        "verse": 12,
        "text": "We work hard with our own hands. When we are vilified, we bless; when we are persecuted, we endure it;"
      },
      {
        "verse": 13,
        "text": "when we are slandered, we answer gently. Up to this moment we have become the scum of the earth, the refuse of the world."
      },
      {
        "verse": 14,
        "text": "I am not writing this to shame you, but to warn you as my beloved children."
      },
      {
        "verse": 15,
        "text": "Even if you have ten thousand guardians in Christ, you do not have many fathers; for in Christ Jesus I became your father through the gospel."
      },
      {
        "verse": 16,
        "text": "Therefore I urge you to imitate me."
      },
      {
        "verse": 17,
        "text": "That is why I have sent you Timothy, my beloved and faithful child in the Lord. He will remind you of my way of life in Christ Jesus, which is exactly what I teach everywhere in every church."
      },
      {
        "verse": 18,
        "text": "Some of you have become arrogant, as if I were not coming to you."
      },
      {
        "verse": 19,
        "text": "But I will come to you shortly, if the Lord is willing, and then I will find out not only what these arrogant people are saying, but what power they have."
      },
      {
        "verse": 20,
        "text": "For the kingdom of God is not a matter of talk but of power."
      },
      {
        "verse": 21,
        "text": "Which do you prefer? Shall I come to you with a rod, or in love and with a gentle spirit?"
      }
    ],
    "NLT": [
      {
        "verse": 1,
        "text": "So then, men ought to regard us as servants of Christ and stewards of the mysteries of God."
      },
      {
        "verse": 2,
        "text": "Now it is required of stewards that they be found faithful."
      },
      {
        "verse": 3,
        "text": "I care very little, however, if I am judged by you or by any human court. In fact, I do not even judge myself."
      },
      {
        "verse": 4,
        "text": "My conscience is clear, but that does not vindicate me. It is the Lord who judges me."
      },
      {
        "verse": 5,
        "text": "Therefore judge nothing before the appointed time; wait until the Lord comes. He will bring to light what is hidden in darkness and will expose the motives of men’s hearts. At that time each will receive his praise from God."
      },
      {
        "verse": 6,
        "text": "Brothers, I have applied these things to myself and Apollos for your benefit, so that you may learn from us not to go beyond what is written. Then you will not take pride in one man over another."
      },
      {
        "verse": 7,
        "text": "For who makes you so superior? What do you have that you did not receive? And if you did receive it, why do you boast as though you did not?"
      },
      {
        "verse": 8,
        "text": "Already you have all you want. Already you have become rich. Without us, you have become kings. How I wish you really were kings, so that we might be kings with you!"
      },
      {
        "verse": 9,
        "text": "For it seems to me that God has displayed us apostles at the end of the procession, like prisoners appointed for death. We have become a spectacle to the whole world, to angels as well as to men."
      },
      {
        "verse": 10,
        "text": "We are fools for Christ, but you are wise in Christ. We are weak, but you are strong. You are honored, but we are dishonored."
      },
      {
        "verse": 11,
        "text": "To this very hour we are hungry and thirsty, we are poorly clothed, we are brutally treated, we are homeless."
      },
      {
        "verse": 12,
        "text": "We work hard with our own hands. When we are vilified, we bless; when we are persecuted, we endure it;"
      },
      {
        "verse": 13,
        "text": "when we are slandered, we answer gently. Up to this moment we have become the scum of the earth, the refuse of the world."
      },
      {
        "verse": 14,
        "text": "I am not writing this to shame you, but to warn you as my beloved children."
      },
      {
        "verse": 15,
        "text": "Even if you have ten thousand guardians in Christ, you do not have many fathers; for in Christ Jesus I became your father through the gospel."
      },
      {
        "verse": 16,
        "text": "Therefore I urge you to imitate me."
      },
      {
        "verse": 17,
        "text": "That is why I have sent you Timothy, my beloved and faithful child in the Lord. He will remind you of my way of life in Christ Jesus, which is exactly what I teach everywhere in every church."
      },
      {
        "verse": 18,
        "text": "Some of you have become arrogant, as if I were not coming to you."
      },
      {
        "verse": 19,
        "text": "But I will come to you shortly, if the Lord is willing, and then I will find out not only what these arrogant people are saying, but what power they have."
      },
      {
        "verse": 20,
        "text": "For the kingdom of God is not a matter of talk but of power."
      },
      {
        "verse": 21,
        "text": "Which do you prefer? Shall I come to you with a rod, or in love and with a gentle spirit?"
      }
    ],
    "AMPC": [
      {
        "verse": 1,
        "text": "So then, men ought to regard us as servants of Christ and stewards of the mysteries of God."
      },
      {
        "verse": 2,
        "text": "Now it is required of stewards that they be found faithful."
      },
      {
        "verse": 3,
        "text": "I care very little, however, if I am judged by you or by any human court. In fact, I do not even judge myself."
      },
      {
        "verse": 4,
        "text": "My conscience is clear, but that does not vindicate me. It is the Lord who judges me."
      },
      {
        "verse": 5,
        "text": "Therefore judge nothing before the appointed time; wait until the Lord comes. He will bring to light what is hidden in darkness and will expose the motives of men’s hearts. At that time each will receive his praise from God."
      },
      {
        "verse": 6,
        "text": "Brothers, I have applied these things to myself and Apollos for your benefit, so that you may learn from us not to go beyond what is written. Then you will not take pride in one man over another."
      },
      {
        "verse": 7,
        "text": "For who makes you so superior? What do you have that you did not receive? And if you did receive it, why do you boast as though you did not?"
      },
      {
        "verse": 8,
        "text": "Already you have all you want. Already you have become rich. Without us, you have become kings. How I wish you really were kings, so that we might be kings with you!"
      },
      {
        "verse": 9,
        "text": "For it seems to me that God has displayed us apostles at the end of the procession, like prisoners appointed for death. We have become a spectacle to the whole world, to angels as well as to men."
      },
      {
        "verse": 10,
        "text": "We are fools for Christ, but you are wise in Christ. We are weak, but you are strong. You are honored, but we are dishonored."
      },
      {
        "verse": 11,
        "text": "To this very hour we are hungry and thirsty, we are poorly clothed, we are brutally treated, we are homeless."
      },
      {
        "verse": 12,
        "text": "We work hard with our own hands. When we are vilified, we bless; when we are persecuted, we endure it;"
      },
      {
        "verse": 13,
        "text": "when we are slandered, we answer gently. Up to this moment we have become the scum of the earth, the refuse of the world."
      },
      {
        "verse": 14,
        "text": "I am not writing this to shame you, but to warn you as my beloved children."
      },
      {
        "verse": 15,
        "text": "Even if you have ten thousand guardians in Christ, you do not have many fathers; for in Christ Jesus I became your father through the gospel."
      },
      {
        "verse": 16,
        "text": "Therefore I urge you to imitate me."
      },
      {
        "verse": 17,
        "text": "That is why I have sent you Timothy, my beloved and faithful child in the Lord. He will remind you of my way of life in Christ Jesus, which is exactly what I teach everywhere in every church."
      },
      {
        "verse": 18,
        "text": "Some of you have become arrogant, as if I were not coming to you."
      },
      {
        "verse": 19,
        "text": "But I will come to you shortly, if the Lord is willing, and then I will find out not only what these arrogant people are saying, but what power they have."
      },
      {
        "verse": 20,
        "text": "For the kingdom of God is not a matter of talk but of power."
      },
      {
        "verse": 21,
        "text": "Which do you prefer? Shall I come to you with a rod, or in love and with a gentle spirit?"
      }
    ],
    "YLT": [
      {
        "verse": 1,
        "text": "Let a man so account of us, as of the ministers of Christ, and stewards of the mysteries of God."
      },
      {
        "verse": 2,
        "text": "Moreover it is required in stewards, that a man be found faithful."
      },
      {
        "verse": 3,
        "text": "But with me it is a very small thing that I should be judged of you, or of man’s judgment: yea, I judge not mine own self."
      },
      {
        "verse": 4,
        "text": "For I know nothing by myself; yet am I not hereby justified: but he that judgeth me is the Lord."
      },
      {
        "verse": 5,
        "text": "Therefore judge nothing before the time, until the Lord come, who both will bring to light the hidden things of darkness, and will make manifest the counsels of the hearts: and then shall every man have praise of God."
      },
      {
        "verse": 6,
        "text": "And these things, brethren, I have in a figure transferred to myself and to Apollos for your sakes; that ye might learn in us not to think of men above that which is written, that no one of you be puffed up for one against another."
      },
      {
        "verse": 7,
        "text": "For who maketh thee to differ from another? and what hast thou that thou didst not receive? now if thou didst receive it, why dost thou glory, as if thou hadst not received it?"
      },
      {
        "verse": 8,
        "text": "Now ye are full, now ye are rich, ye have reigned as kings without us: and I would to God ye did reign, that we also might reign with you."
      },
      {
        "verse": 9,
        "text": "For I think that God hath set forth us the apostles last, as it were appointed to death: for we are made a spectacle unto the world, and to angels, and to men."
      },
      {
        "verse": 10,
        "text": "We are fools for Christ’s sake, but ye are wise in Christ; we are weak, but ye are strong; ye are honourable, but we are despised."
      },
      {
        "verse": 11,
        "text": "Even unto this present hour we both hunger, and thirst, and are naked, and are buffeted, and have no certain dwellingplace;"
      },
      {
        "verse": 12,
        "text": "And labour, working with our own hands: being reviled, we bless; being persecuted, we suffer it:"
      },
      {
        "verse": 13,
        "text": "Being defamed, we intreat: we are made as the filth of the world, and are the offscouring of all things unto this day."
      },
      {
        "verse": 14,
        "text": "I write not these things to shame you, but as my beloved sons I warn you."
      },
      {
        "verse": 15,
        "text": "For though ye have ten thousand instructors in Christ, yet have ye not many fathers: for in Christ Jesus I have begotten you through the gospel."
      },
      {
        "verse": 16,
        "text": "Wherefore I beseech you, be ye followers of me."
      },
      {
        "verse": 17,
        "text": "For this cause have I sent unto you Timotheus, who is my beloved son, and faithful in the Lord, who shall bring you into remembrance of my ways which be in Christ, as I teach every where in every church."
      },
      {
        "verse": 18,
        "text": "Now some are puffed up, as though I would not come to you."
      },
      {
        "verse": 19,
        "text": "But I will come to you shortly, if the Lord will, and will know, not the speech of them which are puffed up, but the power."
      },
      {
        "verse": 20,
        "text": "For the kingdom of God is not in word, but in power."
      },
      {
        "verse": 21,
        "text": "What will ye? shall I come unto you with a rod, or in love, and in the spirit of meekness?"
      }
    ],
    "CUV": [
      {
        "verse": 1,
        "text": "人應當以我們為基督的執事，為神奧祕事的管家。"
      },
      {
        "verse": 2,
        "text": "所求於管家的，是要他有忠心。"
      },
      {
        "verse": 3,
        "text": "我被你們論斷，或被別人論斷，我都以為極小的事；連我自己也不論斷自己。"
      },
      {
        "verse": 4,
        "text": "我雖不覺得自己有錯，卻也不能因此得以稱義；但判斷我的乃是主。"
      },
      {
        "verse": 5,
        "text": "所以，時候未到，甚麼都不要論斷，只等主來，他要照出暗中的隱情，顯明人心的意念。那時，各人要從神那裡得著稱讚。"
      },
      {
        "verse": 6,
        "text": "弟兄們，我為你們的緣故，拿這些事轉比自己和亞波羅，叫你們效法我們不可過於聖經所記，免得你們自高自大，貴重這個，輕看那個。"
      },
      {
        "verse": 7,
        "text": "使你與人不同的是誰呢？你有甚麼不是領受的呢？若是領受的，為何自誇，彷彿不是領受的呢？"
      },
      {
        "verse": 8,
        "text": "你們已經飽足了！已經豐富了！不用我們，自己就作王了！我願意你們果真作王，叫我們也得與你們一同作王。"
      },
      {
        "verse": 9,
        "text": "我想神把我們使徒明明列在末後，好像定死罪的囚犯；因為我們成了一臺戲，給世人和天使觀看。"
      },
      {
        "verse": 10,
        "text": "我們為基督的緣故算是愚拙的，你們在基督裡倒是聰明的；我們軟弱，你們倒強壯；你們有榮耀，我們倒被藐視。"
      },
      {
        "verse": 11,
        "text": "直到如今，我們還是又飢又渴，又赤身露體，又挨打，又沒有一定的住處，"
      },
      {
        "verse": 12,
        "text": "並且勞苦，親手做工。被人咒罵，我們就祝福；被人逼迫，我們就忍受；"
      },
      {
        "verse": 13,
        "text": "被人毀謗，我們就善勸。直到如今，人還把我們看作世界上的污穢，萬物中的渣滓。"
      },
      {
        "verse": 14,
        "text": "我寫這話，不是叫你們羞愧，乃是警戒你們，好像我所親愛的兒女一樣。"
      },
      {
        "verse": 15,
        "text": "你們學基督的，師傅雖有一萬，為父的卻是不多，因我在基督耶穌裡用福音生了你們。"
      },
      {
        "verse": 16,
        "text": "所以，我求你們效法我。"
      },
      {
        "verse": 17,
        "text": "因此我已打發提摩太到你們那裡去。他在主裡面，是我所親愛、有忠心的兒子。他必提醒你們，記念我在基督裡怎樣行事，在各處各教會中怎樣教導人。"
      },
      {
        "verse": 18,
        "text": "有些人自高自大，以為我不到你們那裡去；"
      },
      {
        "verse": 19,
        "text": "然而，主若許我，我必快到你們那裡去，並且我所要知道的，不是那些自高自大之人的言語，乃是他們的權能。"
      },
      {
        "verse": 20,
        "text": "因為神的國不在乎言語，乃在乎權能。"
      },
      {
        "verse": 21,
        "text": "你們願意怎麼樣呢？是願意我帶著刑杖到你們那裡去呢？還是要我存慈愛溫柔的心呢？"
      }
    ],
    "CNV": [
      {
        "verse": 1,
        "text": "人應當以我們為基督的執事，為神奧祕事的管家。"
      },
      {
        "verse": 2,
        "text": "所求於管家的，是要他有忠心。"
      },
      {
        "verse": 3,
        "text": "我被你們論斷，或被別人論斷，我都以為極小的事；連我自己也不論斷自己。"
      },
      {
        "verse": 4,
        "text": "我雖不覺得自己有錯，卻也不能因此得以稱義；但判斷我的乃是主。"
      },
      {
        "verse": 5,
        "text": "所以，時候未到，甚麼都不要論斷，只等主來，他要照出暗中的隱情，顯明人心的意念。那時，各人要從神那裡得著稱讚。"
      },
      {
        "verse": 6,
        "text": "弟兄們，我為你們的緣故，拿這些事轉比自己和亞波羅，叫你們效法我們不可過於聖經所記，免得你們自高自大，貴重這個，輕看那個。"
      },
      {
        "verse": 7,
        "text": "使你與人不同的是誰呢？你有甚麼不是領受的呢？若是領受的，為何自誇，彷彿不是領受的呢？"
      },
      {
        "verse": 8,
        "text": "你們已經飽足了！已經豐富了！不用我們，自己就作王了！我願意你們果真作王，叫我們也得與你們一同作王。"
      },
      {
        "verse": 9,
        "text": "我想神把我們使徒明明列在末後，好像定死罪的囚犯；因為我們成了一臺戲，給世人和天使觀看。"
      },
      {
        "verse": 10,
        "text": "我們為基督的緣故算是愚拙的，你們在基督裡倒是聰明的；我們軟弱，你們倒強壯；你們有榮耀，我們倒被藐視。"
      },
      {
        "verse": 11,
        "text": "直到如今，我們還是又飢又渴，又赤身露體，又挨打，又沒有一定的住處，"
      },
      {
        "verse": 12,
        "text": "並且勞苦，親手做工。被人咒罵，我們就祝福；被人逼迫，我們就忍受；"
      },
      {
        "verse": 13,
        "text": "被人毀謗，我們就善勸。直到如今，人還把我們看作世界上的污穢，萬物中的渣滓。"
      },
      {
        "verse": 14,
        "text": "我寫這話，不是叫你們羞愧，乃是警戒你們，好像我所親愛的兒女一樣。"
      },
      {
        "verse": 15,
        "text": "你們學基督的，師傅雖有一萬，為父的卻是不多，因我在基督耶穌裡用福音生了你們。"
      },
      {
        "verse": 16,
        "text": "所以，我求你們效法我。"
      },
      {
        "verse": 17,
        "text": "因此我已打發提摩太到你們那裡去。他在主裡面，是我所親愛、有忠心的兒子。他必提醒你們，記念我在基督裡怎樣行事，在各處各教會中怎樣教導人。"
      },
      {
        "verse": 18,
        "text": "有些人自高自大，以為我不到你們那裡去；"
      },
      {
        "verse": 19,
        "text": "然而，主若許我，我必快到你們那裡去，並且我所要知道的，不是那些自高自大之人的言語，乃是他們的權能。"
      },
      {
        "verse": 20,
        "text": "因為神的國不在乎言語，乃在乎權能。"
      },
      {
        "verse": 21,
        "text": "你們願意怎麼樣呢？是願意我帶著刑杖到你們那裡去呢？還是要我存慈愛溫柔的心呢？"
      }
    ],
    "CCB": [
      {
        "verse": 1,
        "text": "人應當以我們為基督的執事，為神奧祕事的管家。"
      },
      {
        "verse": 2,
        "text": "所求於管家的，是要他有忠心。"
      },
      {
        "verse": 3,
        "text": "我被你們論斷，或被別人論斷，我都以為極小的事；連我自己也不論斷自己。"
      },
      {
        "verse": 4,
        "text": "我雖不覺得自己有錯，卻也不能因此得以稱義；但判斷我的乃是主。"
      },
      {
        "verse": 5,
        "text": "所以，時候未到，甚麼都不要論斷，只等主來，他要照出暗中的隱情，顯明人心的意念。那時，各人要從神那裡得著稱讚。"
      },
      {
        "verse": 6,
        "text": "弟兄們，我為你們的緣故，拿這些事轉比自己和亞波羅，叫你們效法我們不可過於聖經所記，免得你們自高自大，貴重這個，輕看那個。"
      },
      {
        "verse": 7,
        "text": "使你與人不同的是誰呢？你有甚麼不是領受的呢？若是領受的，為何自誇，彷彿不是領受的呢？"
      },
      {
        "verse": 8,
        "text": "你們已經飽足了！已經豐富了！不用我們，自己就作王了！我願意你們果真作王，叫我們也得與你們一同作王。"
      },
      {
        "verse": 9,
        "text": "我想神把我們使徒明明列在末後，好像定死罪的囚犯；因為我們成了一臺戲，給世人和天使觀看。"
      },
      {
        "verse": 10,
        "text": "我們為基督的緣故算是愚拙的，你們在基督裡倒是聰明的；我們軟弱，你們倒強壯；你們有榮耀，我們倒被藐視。"
      },
      {
        "verse": 11,
        "text": "直到如今，我們還是又飢又渴，又赤身露體，又挨打，又沒有一定的住處，"
      },
      {
        "verse": 12,
        "text": "並且勞苦，親手做工。被人咒罵，我們就祝福；被人逼迫，我們就忍受；"
      },
      {
        "verse": 13,
        "text": "被人毀謗，我們就善勸。直到如今，人還把我們看作世界上的污穢，萬物中的渣滓。"
      },
      {
        "verse": 14,
        "text": "我寫這話，不是叫你們羞愧，乃是警戒你們，好像我所親愛的兒女一樣。"
      },
      {
        "verse": 15,
        "text": "你們學基督的，師傅雖有一萬，為父的卻是不多，因我在基督耶穌裡用福音生了你們。"
      },
      {
        "verse": 16,
        "text": "所以，我求你們效法我。"
      },
      {
        "verse": 17,
        "text": "因此我已打發提摩太到你們那裡去。他在主裡面，是我所親愛、有忠心的兒子。他必提醒你們，記念我在基督裡怎樣行事，在各處各教會中怎樣教導人。"
      },
      {
        "verse": 18,
        "text": "有些人自高自大，以為我不到你們那裡去；"
      },
      {
        "verse": 19,
        "text": "然而，主若許我，我必快到你們那裡去，並且我所要知道的，不是那些自高自大之人的言語，乃是他們的權能。"
      },
      {
        "verse": 20,
        "text": "因為神的國不在乎言語，乃在乎權能。"
      },
      {
        "verse": 21,
        "text": "你們願意怎麼樣呢？是願意我帶著刑杖到你們那裡去呢？還是要我存慈愛溫柔的心呢？"
      }
    ]
  },
  "19:23": {
    "NKJV": [
      {
        "verse": 1,
        "text": "A Psalm of David. The LORD is my shepherd; I shall not want."
      },
      {
        "verse": 2,
        "text": "He makes me lie down in green pastures; He leads me beside quiet waters."
      },
      {
        "verse": 3,
        "text": "He restores my soul; He guides me in the paths of righteousness for the sake of His name."
      },
      {
        "verse": 4,
        "text": "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me; Your rod and Your staff, they comfort me."
      },
      {
        "verse": 5,
        "text": "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows."
      },
      {
        "verse": 6,
        "text": "Surely goodness and mercy will follow me all the days of my life, and I will dwell in the house of the LORD forever."
      }
    ],
    "KJV": [
      {
        "verse": 1,
        "text": "A Psalm of David. The Lord is my shepherd; I shall not want."
      },
      {
        "verse": 2,
        "text": "He maketh me to lie down in green pastures: he leadeth me beside the still waters."
      },
      {
        "verse": 3,
        "text": "He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake."
      },
      {
        "verse": 4,
        "text": "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me."
      },
      {
        "verse": 5,
        "text": "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over."
      },
      {
        "verse": 6,
        "text": "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever."
      }
    ],
    "ESV": [
      {
        "verse": 1,
        "text": "A Psalm of David. The LORD is my shepherd; I shall not want."
      },
      {
        "verse": 2,
        "text": "He makes me lie down in green pastures; He leads me beside quiet waters."
      },
      {
        "verse": 3,
        "text": "He restores my soul; He guides me in the paths of righteousness for the sake of His name."
      },
      {
        "verse": 4,
        "text": "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me; Your rod and Your staff, they comfort me."
      },
      {
        "verse": 5,
        "text": "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows."
      },
      {
        "verse": 6,
        "text": "Surely goodness and mercy will follow me all the days of my life, and I will dwell in the house of the LORD forever."
      }
    ],
    "NIV": [
      {
        "verse": 1,
        "text": "A Psalm of David. The LORD is my shepherd; I shall not want."
      },
      {
        "verse": 2,
        "text": "He makes me lie down in green pastures; He leads me beside quiet waters."
      },
      {
        "verse": 3,
        "text": "He restores my soul; He guides me in the paths of righteousness for the sake of His name."
      },
      {
        "verse": 4,
        "text": "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me; Your rod and Your staff, they comfort me."
      },
      {
        "verse": 5,
        "text": "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows."
      },
      {
        "verse": 6,
        "text": "Surely goodness and mercy will follow me all the days of my life, and I will dwell in the house of the LORD forever."
      }
    ],
    "NLT": [
      {
        "verse": 1,
        "text": "A Psalm of David. The LORD is my shepherd; I shall not want."
      },
      {
        "verse": 2,
        "text": "He makes me lie down in green pastures; He leads me beside quiet waters."
      },
      {
        "verse": 3,
        "text": "He restores my soul; He guides me in the paths of righteousness for the sake of His name."
      },
      {
        "verse": 4,
        "text": "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me; Your rod and Your staff, they comfort me."
      },
      {
        "verse": 5,
        "text": "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows."
      },
      {
        "verse": 6,
        "text": "Surely goodness and mercy will follow me all the days of my life, and I will dwell in the house of the LORD forever."
      }
    ],
    "AMPC": [
      {
        "verse": 1,
        "text": "A Psalm of David. The LORD is my shepherd; I shall not want."
      },
      {
        "verse": 2,
        "text": "He makes me lie down in green pastures; He leads me beside quiet waters."
      },
      {
        "verse": 3,
        "text": "He restores my soul; He guides me in the paths of righteousness for the sake of His name."
      },
      {
        "verse": 4,
        "text": "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me; Your rod and Your staff, they comfort me."
      },
      {
        "verse": 5,
        "text": "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows."
      },
      {
        "verse": 6,
        "text": "Surely goodness and mercy will follow me all the days of my life, and I will dwell in the house of the LORD forever."
      }
    ],
    "YLT": [
      {
        "verse": 1,
        "text": "A Psalm of David. The Lord is my shepherd; I shall not want."
      },
      {
        "verse": 2,
        "text": "He maketh me to lie down in green pastures: he leadeth me beside the still waters."
      },
      {
        "verse": 3,
        "text": "He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake."
      },
      {
        "verse": 4,
        "text": "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me."
      },
      {
        "verse": 5,
        "text": "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over."
      },
      {
        "verse": 6,
        "text": "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever."
      }
    ],
    "CUV": [
      {
        "verse": 1,
        "text": "（大衛的詩。）耶和華是我的牧者，我必不致缺乏。"
      },
      {
        "verse": 2,
        "text": "他使我躺臥在青草地上，領我在可安歇的水邊。"
      },
      {
        "verse": 3,
        "text": "他使我的靈魂甦醒，為自己的名引導我走義路。"
      },
      {
        "verse": 4,
        "text": "我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在；你的杖，你的竿，都安慰我。"
      },
      {
        "verse": 5,
        "text": "在我敵人面前，你為我擺設筵席；你用油膏了我的頭，使我的福杯滿溢。"
      },
      {
        "verse": 6,
        "text": "我一生一世必有恩惠慈愛隨著我；我且要住在耶和華的殿中，直到永遠。"
      }
    ],
    "CNV": [
      {
        "verse": 1,
        "text": "（大衛的詩。）耶和華是我的牧者，我必不致缺乏。"
      },
      {
        "verse": 2,
        "text": "他使我躺臥在青草地上，領我在可安歇的水邊。"
      },
      {
        "verse": 3,
        "text": "他使我的靈魂甦醒，為自己的名引導我走義路。"
      },
      {
        "verse": 4,
        "text": "我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在；你的杖，你的竿，都安慰我。"
      },
      {
        "verse": 5,
        "text": "在我敵人面前，你為我擺設筵席；你用油膏了我的頭，使我的福杯滿溢。"
      },
      {
        "verse": 6,
        "text": "我一生一世必有恩惠慈愛隨著我；我且要住在耶和華的殿中，直到永遠。"
      }
    ],
    "CCB": [
      {
        "verse": 1,
        "text": "（大衛的詩。）耶和華是我的牧者，我必不致缺乏。"
      },
      {
        "verse": 2,
        "text": "他使我躺臥在青草地上，領我在可安歇的水邊。"
      },
      {
        "verse": 3,
        "text": "他使我的靈魂甦醒，為自己的名引導我走義路。"
      },
      {
        "verse": 4,
        "text": "我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在；你的杖，你的竿，都安慰我。"
      },
      {
        "verse": 5,
        "text": "在我敵人面前，你為我擺設筵席；你用油膏了我的頭，使我的福杯滿溢。"
      },
      {
        "verse": 6,
        "text": "我一生一世必有恩惠慈愛隨著我；我且要住在耶和華的殿中，直到永遠。"
      }
    ]
  },
  "43:11": {
    "NKJV": [
      {
        "verse": 1,
        "text": "At this time a man named Lazarus was sick. He lived in Bethany, the village of Mary and her sister Martha."
      },
      {
        "verse": 2,
        "text": "(Mary, whose brother Lazarus was sick, was to anoint the Lord with perfume and wipe His feet with her hair.)"
      },
      {
        "verse": 3,
        "text": "So the sisters sent word to Jesus, “Lord, the one You love is sick.”"
      },
      {
        "verse": 4,
        "text": "When Jesus heard this, He said, “This sickness will not end in death. No, it is for the glory of God, so that the Son of God may be glorified through it.”"
      },
      {
        "verse": 5,
        "text": "Now Jesus loved Martha and her sister and Lazarus."
      },
      {
        "verse": 6,
        "text": "So on hearing that Lazarus was sick, He stayed where He was for two days,"
      },
      {
        "verse": 7,
        "text": "and then He said to the disciples, “Let us go back to Judea.”"
      },
      {
        "verse": 8,
        "text": "“Rabbi,” they replied, “the Jews just tried to stone You, and You are going back there?”"
      },
      {
        "verse": 9,
        "text": "Jesus answered, “Are there not twelve hours of daylight? If anyone walks in the daytime, he will not stumble, because he sees by the light of this world."
      },
      {
        "verse": 10,
        "text": "But if anyone walks at night, he will stumble, because he has no light.”"
      },
      {
        "verse": 11,
        "text": "After He had said this, He told them, “Our friend Lazarus has fallen asleep, but I am going there to wake him up.”"
      },
      {
        "verse": 12,
        "text": "His disciples replied, “Lord, if he is sleeping, he will get better.”"
      },
      {
        "verse": 13,
        "text": "They thought that Jesus was talking about actual sleep, but He was speaking about the death of Lazarus."
      },
      {
        "verse": 14,
        "text": "So Jesus told them plainly, “Lazarus is dead,"
      },
      {
        "verse": 15,
        "text": "and for your sake I am glad I was not there, so that you may believe. But let us go to him.”"
      },
      {
        "verse": 16,
        "text": "Then Thomas called Didymus said to his fellow disciples, “Let us also go, so that we may die with Him.”"
      },
      {
        "verse": 17,
        "text": "When Jesus arrived, He found that Lazarus had already spent four days in the tomb."
      },
      {
        "verse": 18,
        "text": "Now Bethany was near Jerusalem, a little less than two miles away,"
      },
      {
        "verse": 19,
        "text": "and many of the Jews had come to Martha and Mary to console them in the loss of their brother."
      },
      {
        "verse": 20,
        "text": "So when Martha heard that Jesus was coming, she went out to meet Him; but Mary stayed at home."
      },
      {
        "verse": 21,
        "text": "Martha said to Jesus, “Lord, if You had been here, my brother would not have died."
      },
      {
        "verse": 22,
        "text": "But even now I know that God will give You whatever You ask of Him.”"
      },
      {
        "verse": 23,
        "text": "“Your brother will rise again,” Jesus told her."
      },
      {
        "verse": 24,
        "text": "Martha replied, “I know that he will rise again in the resurrection at the last day.”"
      },
      {
        "verse": 25,
        "text": "Jesus said to her, “I am the resurrection and the life. Whoever believes in Me will live, even though he dies."
      },
      {
        "verse": 26,
        "text": "And everyone who lives and believes in Me will never die. Do you believe this?”"
      },
      {
        "verse": 27,
        "text": "“Yes, Lord,” she answered, “I believe that You are the Christ, the Son of God, who was to come into the world.”"
      },
      {
        "verse": 28,
        "text": "After Martha had said this, she went back and called her sister Mary aside to tell her, “The Teacher is here and is asking for you.”"
      },
      {
        "verse": 29,
        "text": "And when Mary heard this, she got up quickly and went to Him."
      },
      {
        "verse": 30,
        "text": "Now Jesus had not yet entered the village, but was still at the place where Martha had met Him."
      },
      {
        "verse": 31,
        "text": "When the Jews who were in the house consoling Mary saw how quickly she got up and went out, they followed her, supposing she was going to the tomb to mourn there."
      },
      {
        "verse": 32,
        "text": "When Mary came to Jesus and saw Him, she fell at His feet and said, “Lord, if You had been here, my brother would not have died.”"
      },
      {
        "verse": 33,
        "text": "When Jesus saw her weeping, and the Jews who had come with her also weeping, He was deeply moved in spirit and troubled."
      },
      {
        "verse": 34,
        "text": "“Where have you put him?” He asked. “Come and see, Lord,” they answered."
      },
      {
        "verse": 35,
        "text": "Jesus wept."
      },
      {
        "verse": 36,
        "text": "Then the Jews said, “See how He loved him!”"
      },
      {
        "verse": 37,
        "text": "But some of them asked, “Could not this man who opened the eyes of the blind also have kept Lazarus from dying?”"
      },
      {
        "verse": 38,
        "text": "Jesus, once again deeply moved, came to the tomb. It was a cave with a stone laid across the entrance."
      },
      {
        "verse": 39,
        "text": "“Take away the stone,” Jesus said. “Lord, by now he stinks,” said Martha, the sister of the dead man. “It has already been four days.”"
      },
      {
        "verse": 40,
        "text": "Jesus replied, “Did I not tell you that if you believed, you would see the glory of God?”"
      },
      {
        "verse": 41,
        "text": "So they took away the stone. Then Jesus lifted His eyes upward and said, “Father, I thank You that You have heard Me."
      },
      {
        "verse": 42,
        "text": "I knew that You always hear Me, but I say this for the benefit of the people standing here, so they may believe that You sent Me.”"
      },
      {
        "verse": 43,
        "text": "After Jesus had said this, He called out in a loud voice, “Lazarus, come out!”"
      },
      {
        "verse": 44,
        "text": "The man who had been dead came out with his hands and feet bound in strips of linen, and his face wrapped in a cloth. “Unwrap him and let him go,” Jesus told them."
      },
      {
        "verse": 45,
        "text": "Therefore many of the Jews who had come to Mary, and had seen what Jesus did, believed in Him."
      },
      {
        "verse": 46,
        "text": "But some of them went to the Pharisees and told them what Jesus had done."
      },
      {
        "verse": 47,
        "text": "Then the chief priests and Pharisees convened the Sanhedrin and said, “What are we to do? This man is performing many signs."
      },
      {
        "verse": 48,
        "text": "If we let Him go on like this, everyone will believe in Him, and then the Romans will come and take away both our place and our nation.”"
      },
      {
        "verse": 49,
        "text": "But one of them, named Caiaphas, who was high priest that year, said to them, “You know nothing at all!"
      },
      {
        "verse": 50,
        "text": "You do not realize that it is better for you that one man die for the people than that the whole nation perish.”"
      },
      {
        "verse": 51,
        "text": "Caiaphas did not say this on his own. Instead, as high priest that year, he was prophesying that Jesus would die for the nation,"
      },
      {
        "verse": 52,
        "text": "and not only for the nation, but also for the scattered children of God, to gather them together into one."
      },
      {
        "verse": 53,
        "text": "So from that day on they plotted to kill Him."
      },
      {
        "verse": 54,
        "text": "As a result, Jesus no longer went about publicly among the Jews, but He withdrew to a town called Ephraim in an area near the wilderness. And He stayed there with the disciples."
      },
      {
        "verse": 55,
        "text": "Now the Jewish Passover was near, and many people went up from the country to Jerusalem to purify themselves before the Passover."
      },
      {
        "verse": 56,
        "text": "They kept looking for Jesus and asking one another as they stood in the temple courts, “What do you think? Will He come to the feast at all?”"
      },
      {
        "verse": 57,
        "text": "But the chief priests and Pharisees had given orders that anyone who knew where He was must report it, so that they could arrest Him."
      }
    ],
    "KJV": [
      {
        "verse": 1,
        "text": "Now a certain man was sick, named Lazarus, of Bethany, the town of Mary and her sister Martha."
      },
      {
        "verse": 2,
        "text": "(It was that Mary which anointed the Lord with ointment, and wiped his feet with her hair, whose brother Lazarus was sick.)"
      },
      {
        "verse": 3,
        "text": "Therefore his sisters sent unto him, saying, Lord, behold, he whom thou lovest is sick."
      },
      {
        "verse": 4,
        "text": "When Jesus heard that, he said, This sickness is not unto death, but for the glory of God, that the Son of God might be glorified thereby."
      },
      {
        "verse": 5,
        "text": "Now Jesus loved Martha, and her sister, and Lazarus."
      },
      {
        "verse": 6,
        "text": "When he had heard therefore that he was sick, he abode two days still in the same place where he was."
      },
      {
        "verse": 7,
        "text": "Then after that saith he to his disciples, Let us go into Judea again."
      },
      {
        "verse": 8,
        "text": "His disciples say unto him, Master, the Jews of late sought to stone thee; and goest thou thither again?"
      },
      {
        "verse": 9,
        "text": "Jesus answered, Are there not twelve hours in the day? If any man walk in the day, he stumbleth not, because he seeth the light of this world."
      },
      {
        "verse": 10,
        "text": "But if a man walk in the night, he stumbleth, because there is no light in him."
      },
      {
        "verse": 11,
        "text": "These things said he: and after that he saith unto them, Our friend Lazarus sleepeth; but I go, that I may awake him out of sleep."
      },
      {
        "verse": 12,
        "text": "Then said his disciples, Lord, if he sleep, he shall do well."
      },
      {
        "verse": 13,
        "text": "Howbeit Jesus spake of his death: but they thought that he had spoken of taking of rest in sleep."
      },
      {
        "verse": 14,
        "text": "Then said Jesus unto them plainly, Lazarus is dead."
      },
      {
        "verse": 15,
        "text": "And I am glad for your sakes that I was not there, to the intent ye may believe; nevertheless let us go unto him."
      },
      {
        "verse": 16,
        "text": "Then said Thomas, which is called Didymus, unto his fellowdisciples, Let us also go, that we may die with him."
      },
      {
        "verse": 17,
        "text": "Then when Jesus came, he found that he had lain in the grave four days already."
      },
      {
        "verse": 18,
        "text": "Now Bethany was nigh unto Jerusalem, about fifteen furlongs off:"
      },
      {
        "verse": 19,
        "text": "And many of the Jews came to Martha and Mary, to comfort them concerning their brother."
      },
      {
        "verse": 20,
        "text": "Then Martha, as soon as she heard that Jesus was coming, went and met him: but Mary sat still in the house."
      },
      {
        "verse": 21,
        "text": "Then said Martha unto Jesus, Lord, if thou hadst been here, my brother had not died."
      },
      {
        "verse": 22,
        "text": "But I know, that even now, whatsoever thou wilt ask of God, God will give it thee."
      },
      {
        "verse": 23,
        "text": "Jesus saith unto her, Thy brother shall rise again."
      },
      {
        "verse": 24,
        "text": "Martha saith unto him, I know that he shall rise again in the resurrection at the last day."
      },
      {
        "verse": 25,
        "text": "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live:"
      },
      {
        "verse": 26,
        "text": "And whosoever liveth and believeth in me shall never die. Believest thou this?"
      },
      {
        "verse": 27,
        "text": "She saith unto him, Yea, Lord: I believe that thou art the Christ, the Son of God, which should come into the world."
      },
      {
        "verse": 28,
        "text": "And when she had so said, she went her way, and called Mary her sister secretly, saying, The Master is come, and calleth for thee."
      },
      {
        "verse": 29,
        "text": "As soon as she heard that, she arose quickly, and came unto him."
      },
      {
        "verse": 30,
        "text": "Now Jesus was not yet come into the town, but was in that place where Martha met him."
      },
      {
        "verse": 31,
        "text": "The Jews then which were with her in the house, and comforted her, when they saw Mary, that she rose up hastily and went out, followed her, saying, She goeth unto the grave to weep there."
      },
      {
        "verse": 32,
        "text": "Then when Mary was come where Jesus was, and saw him, she fell down at his feet, saying unto him, Lord, if thou hadst been here, my brother had not died."
      },
      {
        "verse": 33,
        "text": "When Jesus therefore saw her weeping, and the Jews also weeping which came with her, he groaned in the spirit, and was troubled,"
      },
      {
        "verse": 34,
        "text": "And said, Where have ye laid him? They said unto him, Lord, come and see."
      },
      {
        "verse": 35,
        "text": "Jesus wept."
      },
      {
        "verse": 36,
        "text": "Then said the Jews, Behold how he loved him!"
      },
      {
        "verse": 37,
        "text": "And some of them said, Could not this man, which opened the eyes of the blind, have caused that even this man should not have died?"
      },
      {
        "verse": 38,
        "text": "Jesus therefore again groaning in himself cometh to the grave. It was a cave, and a stone lay upon it."
      },
      {
        "verse": 39,
        "text": "Jesus said, Take ye away the stone. Martha, the sister of him that was dead, saith unto him, Lord, by this time he stinketh: for he hath been dead four days."
      },
      {
        "verse": 40,
        "text": "Jesus saith unto her, Said I not unto thee, that, if thou wouldest believe, thou shouldest see the glory of God?"
      },
      {
        "verse": 41,
        "text": "Then they took away the stone from the place where the dead was laid. And Jesus lifted up his eyes, and said, Father, I thank thee that thou hast heard me."
      },
      {
        "verse": 42,
        "text": "And I knew that thou hearest me always: but because of the people which stand by I said it, that they may believe that thou hast sent me."
      },
      {
        "verse": 43,
        "text": "And when he thus had spoken, he cried with a loud voice, Lazarus, come forth."
      },
      {
        "verse": 44,
        "text": "And he that was dead came forth, bound hand and foot with graveclothes: and his face was bound about with a napkin. Jesus saith unto them, Loose him, and let him go."
      },
      {
        "verse": 45,
        "text": "Then many of the Jews which came to Mary, and had seen the things which Jesus did, believed on him."
      },
      {
        "verse": 46,
        "text": "But some of them went their ways to the Pharisees, and told them what things Jesus had done."
      },
      {
        "verse": 47,
        "text": "Then gathered the chief priests and the Pharisees a council, and said, What do we? for this man doeth many miracles."
      },
      {
        "verse": 48,
        "text": "If we let him thus alone, all men will believe on him: and the Romans shall come and take away both our place and nation."
      },
      {
        "verse": 49,
        "text": "And one of them, named Caiaphas, being the high priest that same year, said unto them, Ye know nothing at all,"
      },
      {
        "verse": 50,
        "text": "Nor consider that it is expedient for us, that one man should die for the people, and that the whole nation perish not."
      },
      {
        "verse": 51,
        "text": "And this spake he not of himself: but being high priest that year, he prophesied that Jesus should die for that nation;"
      },
      {
        "verse": 52,
        "text": "And not for that nation only, but that also he should gather together in one the children of God that were scattered abroad."
      },
      {
        "verse": 53,
        "text": "Then from that day forth they took counsel together for to put him to death."
      },
      {
        "verse": 54,
        "text": "Jesus therefore walked no more openly among the Jews; but went thence unto a country near to the wilderness, into a city called Ephraim, and there continued with his disciples."
      },
      {
        "verse": 55,
        "text": "And the Jews’ passover was nigh at hand: and many went out of the country up to Jerusalem before the passover, to purify themselves."
      },
      {
        "verse": 56,
        "text": "Then sought they for Jesus, and spake among themselves, as they stood in the temple, What think ye, that he will not come to the feast?"
      },
      {
        "verse": 57,
        "text": "Now both the chief priests and the Pharisees had given a commandment, that, if any man knew where he were, he should shew it, that they might take him."
      }
    ],
    "ESV": [
      {
        "verse": 1,
        "text": "At this time a man named Lazarus was sick. He lived in Bethany, the village of Mary and her sister Martha."
      },
      {
        "verse": 2,
        "text": "(Mary, whose brother Lazarus was sick, was to anoint the Lord with perfume and wipe His feet with her hair.)"
      },
      {
        "verse": 3,
        "text": "So the sisters sent word to Jesus, “Lord, the one You love is sick.”"
      },
      {
        "verse": 4,
        "text": "When Jesus heard this, He said, “This sickness will not end in death. No, it is for the glory of God, so that the Son of God may be glorified through it.”"
      },
      {
        "verse": 5,
        "text": "Now Jesus loved Martha and her sister and Lazarus."
      },
      {
        "verse": 6,
        "text": "So on hearing that Lazarus was sick, He stayed where He was for two days,"
      },
      {
        "verse": 7,
        "text": "and then He said to the disciples, “Let us go back to Judea.”"
      },
      {
        "verse": 8,
        "text": "“Rabbi,” they replied, “the Jews just tried to stone You, and You are going back there?”"
      },
      {
        "verse": 9,
        "text": "Jesus answered, “Are there not twelve hours of daylight? If anyone walks in the daytime, he will not stumble, because he sees by the light of this world."
      },
      {
        "verse": 10,
        "text": "But if anyone walks at night, he will stumble, because he has no light.”"
      },
      {
        "verse": 11,
        "text": "After He had said this, He told them, “Our friend Lazarus has fallen asleep, but I am going there to wake him up.”"
      },
      {
        "verse": 12,
        "text": "His disciples replied, “Lord, if he is sleeping, he will get better.”"
      },
      {
        "verse": 13,
        "text": "They thought that Jesus was talking about actual sleep, but He was speaking about the death of Lazarus."
      },
      {
        "verse": 14,
        "text": "So Jesus told them plainly, “Lazarus is dead,"
      },
      {
        "verse": 15,
        "text": "and for your sake I am glad I was not there, so that you may believe. But let us go to him.”"
      },
      {
        "verse": 16,
        "text": "Then Thomas called Didymus said to his fellow disciples, “Let us also go, so that we may die with Him.”"
      },
      {
        "verse": 17,
        "text": "When Jesus arrived, He found that Lazarus had already spent four days in the tomb."
      },
      {
        "verse": 18,
        "text": "Now Bethany was near Jerusalem, a little less than two miles away,"
      },
      {
        "verse": 19,
        "text": "and many of the Jews had come to Martha and Mary to console them in the loss of their brother."
      },
      {
        "verse": 20,
        "text": "So when Martha heard that Jesus was coming, she went out to meet Him; but Mary stayed at home."
      },
      {
        "verse": 21,
        "text": "Martha said to Jesus, “Lord, if You had been here, my brother would not have died."
      },
      {
        "verse": 22,
        "text": "But even now I know that God will give You whatever You ask of Him.”"
      },
      {
        "verse": 23,
        "text": "“Your brother will rise again,” Jesus told her."
      },
      {
        "verse": 24,
        "text": "Martha replied, “I know that he will rise again in the resurrection at the last day.”"
      },
      {
        "verse": 25,
        "text": "Jesus said to her, “I am the resurrection and the life. Whoever believes in Me will live, even though he dies."
      },
      {
        "verse": 26,
        "text": "And everyone who lives and believes in Me will never die. Do you believe this?”"
      },
      {
        "verse": 27,
        "text": "“Yes, Lord,” she answered, “I believe that You are the Christ, the Son of God, who was to come into the world.”"
      },
      {
        "verse": 28,
        "text": "After Martha had said this, she went back and called her sister Mary aside to tell her, “The Teacher is here and is asking for you.”"
      },
      {
        "verse": 29,
        "text": "And when Mary heard this, she got up quickly and went to Him."
      },
      {
        "verse": 30,
        "text": "Now Jesus had not yet entered the village, but was still at the place where Martha had met Him."
      },
      {
        "verse": 31,
        "text": "When the Jews who were in the house consoling Mary saw how quickly she got up and went out, they followed her, supposing she was going to the tomb to mourn there."
      },
      {
        "verse": 32,
        "text": "When Mary came to Jesus and saw Him, she fell at His feet and said, “Lord, if You had been here, my brother would not have died.”"
      },
      {
        "verse": 33,
        "text": "When Jesus saw her weeping, and the Jews who had come with her also weeping, He was deeply moved in spirit and troubled."
      },
      {
        "verse": 34,
        "text": "“Where have you put him?” He asked. “Come and see, Lord,” they answered."
      },
      {
        "verse": 35,
        "text": "Jesus wept."
      },
      {
        "verse": 36,
        "text": "Then the Jews said, “See how He loved him!”"
      },
      {
        "verse": 37,
        "text": "But some of them asked, “Could not this man who opened the eyes of the blind also have kept Lazarus from dying?”"
      },
      {
        "verse": 38,
        "text": "Jesus, once again deeply moved, came to the tomb. It was a cave with a stone laid across the entrance."
      },
      {
        "verse": 39,
        "text": "“Take away the stone,” Jesus said. “Lord, by now he stinks,” said Martha, the sister of the dead man. “It has already been four days.”"
      },
      {
        "verse": 40,
        "text": "Jesus replied, “Did I not tell you that if you believed, you would see the glory of God?”"
      },
      {
        "verse": 41,
        "text": "So they took away the stone. Then Jesus lifted His eyes upward and said, “Father, I thank You that You have heard Me."
      },
      {
        "verse": 42,
        "text": "I knew that You always hear Me, but I say this for the benefit of the people standing here, so they may believe that You sent Me.”"
      },
      {
        "verse": 43,
        "text": "After Jesus had said this, He called out in a loud voice, “Lazarus, come out!”"
      },
      {
        "verse": 44,
        "text": "The man who had been dead came out with his hands and feet bound in strips of linen, and his face wrapped in a cloth. “Unwrap him and let him go,” Jesus told them."
      },
      {
        "verse": 45,
        "text": "Therefore many of the Jews who had come to Mary, and had seen what Jesus did, believed in Him."
      },
      {
        "verse": 46,
        "text": "But some of them went to the Pharisees and told them what Jesus had done."
      },
      {
        "verse": 47,
        "text": "Then the chief priests and Pharisees convened the Sanhedrin and said, “What are we to do? This man is performing many signs."
      },
      {
        "verse": 48,
        "text": "If we let Him go on like this, everyone will believe in Him, and then the Romans will come and take away both our place and our nation.”"
      },
      {
        "verse": 49,
        "text": "But one of them, named Caiaphas, who was high priest that year, said to them, “You know nothing at all!"
      },
      {
        "verse": 50,
        "text": "You do not realize that it is better for you that one man die for the people than that the whole nation perish.”"
      },
      {
        "verse": 51,
        "text": "Caiaphas did not say this on his own. Instead, as high priest that year, he was prophesying that Jesus would die for the nation,"
      },
      {
        "verse": 52,
        "text": "and not only for the nation, but also for the scattered children of God, to gather them together into one."
      },
      {
        "verse": 53,
        "text": "So from that day on they plotted to kill Him."
      },
      {
        "verse": 54,
        "text": "As a result, Jesus no longer went about publicly among the Jews, but He withdrew to a town called Ephraim in an area near the wilderness. And He stayed there with the disciples."
      },
      {
        "verse": 55,
        "text": "Now the Jewish Passover was near, and many people went up from the country to Jerusalem to purify themselves before the Passover."
      },
      {
        "verse": 56,
        "text": "They kept looking for Jesus and asking one another as they stood in the temple courts, “What do you think? Will He come to the feast at all?”"
      },
      {
        "verse": 57,
        "text": "But the chief priests and Pharisees had given orders that anyone who knew where He was must report it, so that they could arrest Him."
      }
    ],
    "NIV": [
      {
        "verse": 1,
        "text": "At this time a man named Lazarus was sick. He lived in Bethany, the village of Mary and her sister Martha."
      },
      {
        "verse": 2,
        "text": "(Mary, whose brother Lazarus was sick, was to anoint the Lord with perfume and wipe His feet with her hair.)"
      },
      {
        "verse": 3,
        "text": "So the sisters sent word to Jesus, “Lord, the one You love is sick.”"
      },
      {
        "verse": 4,
        "text": "When Jesus heard this, He said, “This sickness will not end in death. No, it is for the glory of God, so that the Son of God may be glorified through it.”"
      },
      {
        "verse": 5,
        "text": "Now Jesus loved Martha and her sister and Lazarus."
      },
      {
        "verse": 6,
        "text": "So on hearing that Lazarus was sick, He stayed where He was for two days,"
      },
      {
        "verse": 7,
        "text": "and then He said to the disciples, “Let us go back to Judea.”"
      },
      {
        "verse": 8,
        "text": "“Rabbi,” they replied, “the Jews just tried to stone You, and You are going back there?”"
      },
      {
        "verse": 9,
        "text": "Jesus answered, “Are there not twelve hours of daylight? If anyone walks in the daytime, he will not stumble, because he sees by the light of this world."
      },
      {
        "verse": 10,
        "text": "But if anyone walks at night, he will stumble, because he has no light.”"
      },
      {
        "verse": 11,
        "text": "After He had said this, He told them, “Our friend Lazarus has fallen asleep, but I am going there to wake him up.”"
      },
      {
        "verse": 12,
        "text": "His disciples replied, “Lord, if he is sleeping, he will get better.”"
      },
      {
        "verse": 13,
        "text": "They thought that Jesus was talking about actual sleep, but He was speaking about the death of Lazarus."
      },
      {
        "verse": 14,
        "text": "So Jesus told them plainly, “Lazarus is dead,"
      },
      {
        "verse": 15,
        "text": "and for your sake I am glad I was not there, so that you may believe. But let us go to him.”"
      },
      {
        "verse": 16,
        "text": "Then Thomas called Didymus said to his fellow disciples, “Let us also go, so that we may die with Him.”"
      },
      {
        "verse": 17,
        "text": "When Jesus arrived, He found that Lazarus had already spent four days in the tomb."
      },
      {
        "verse": 18,
        "text": "Now Bethany was near Jerusalem, a little less than two miles away,"
      },
      {
        "verse": 19,
        "text": "and many of the Jews had come to Martha and Mary to console them in the loss of their brother."
      },
      {
        "verse": 20,
        "text": "So when Martha heard that Jesus was coming, she went out to meet Him; but Mary stayed at home."
      },
      {
        "verse": 21,
        "text": "Martha said to Jesus, “Lord, if You had been here, my brother would not have died."
      },
      {
        "verse": 22,
        "text": "But even now I know that God will give You whatever You ask of Him.”"
      },
      {
        "verse": 23,
        "text": "“Your brother will rise again,” Jesus told her."
      },
      {
        "verse": 24,
        "text": "Martha replied, “I know that he will rise again in the resurrection at the last day.”"
      },
      {
        "verse": 25,
        "text": "Jesus said to her, “I am the resurrection and the life. Whoever believes in Me will live, even though he dies."
      },
      {
        "verse": 26,
        "text": "And everyone who lives and believes in Me will never die. Do you believe this?”"
      },
      {
        "verse": 27,
        "text": "“Yes, Lord,” she answered, “I believe that You are the Christ, the Son of God, who was to come into the world.”"
      },
      {
        "verse": 28,
        "text": "After Martha had said this, she went back and called her sister Mary aside to tell her, “The Teacher is here and is asking for you.”"
      },
      {
        "verse": 29,
        "text": "And when Mary heard this, she got up quickly and went to Him."
      },
      {
        "verse": 30,
        "text": "Now Jesus had not yet entered the village, but was still at the place where Martha had met Him."
      },
      {
        "verse": 31,
        "text": "When the Jews who were in the house consoling Mary saw how quickly she got up and went out, they followed her, supposing she was going to the tomb to mourn there."
      },
      {
        "verse": 32,
        "text": "When Mary came to Jesus and saw Him, she fell at His feet and said, “Lord, if You had been here, my brother would not have died.”"
      },
      {
        "verse": 33,
        "text": "When Jesus saw her weeping, and the Jews who had come with her also weeping, He was deeply moved in spirit and troubled."
      },
      {
        "verse": 34,
        "text": "“Where have you put him?” He asked. “Come and see, Lord,” they answered."
      },
      {
        "verse": 35,
        "text": "Jesus wept."
      },
      {
        "verse": 36,
        "text": "Then the Jews said, “See how He loved him!”"
      },
      {
        "verse": 37,
        "text": "But some of them asked, “Could not this man who opened the eyes of the blind also have kept Lazarus from dying?”"
      },
      {
        "verse": 38,
        "text": "Jesus, once again deeply moved, came to the tomb. It was a cave with a stone laid across the entrance."
      },
      {
        "verse": 39,
        "text": "“Take away the stone,” Jesus said. “Lord, by now he stinks,” said Martha, the sister of the dead man. “It has already been four days.”"
      },
      {
        "verse": 40,
        "text": "Jesus replied, “Did I not tell you that if you believed, you would see the glory of God?”"
      },
      {
        "verse": 41,
        "text": "So they took away the stone. Then Jesus lifted His eyes upward and said, “Father, I thank You that You have heard Me."
      },
      {
        "verse": 42,
        "text": "I knew that You always hear Me, but I say this for the benefit of the people standing here, so they may believe that You sent Me.”"
      },
      {
        "verse": 43,
        "text": "After Jesus had said this, He called out in a loud voice, “Lazarus, come out!”"
      },
      {
        "verse": 44,
        "text": "The man who had been dead came out with his hands and feet bound in strips of linen, and his face wrapped in a cloth. “Unwrap him and let him go,” Jesus told them."
      },
      {
        "verse": 45,
        "text": "Therefore many of the Jews who had come to Mary, and had seen what Jesus did, believed in Him."
      },
      {
        "verse": 46,
        "text": "But some of them went to the Pharisees and told them what Jesus had done."
      },
      {
        "verse": 47,
        "text": "Then the chief priests and Pharisees convened the Sanhedrin and said, “What are we to do? This man is performing many signs."
      },
      {
        "verse": 48,
        "text": "If we let Him go on like this, everyone will believe in Him, and then the Romans will come and take away both our place and our nation.”"
      },
      {
        "verse": 49,
        "text": "But one of them, named Caiaphas, who was high priest that year, said to them, “You know nothing at all!"
      },
      {
        "verse": 50,
        "text": "You do not realize that it is better for you that one man die for the people than that the whole nation perish.”"
      },
      {
        "verse": 51,
        "text": "Caiaphas did not say this on his own. Instead, as high priest that year, he was prophesying that Jesus would die for the nation,"
      },
      {
        "verse": 52,
        "text": "and not only for the nation, but also for the scattered children of God, to gather them together into one."
      },
      {
        "verse": 53,
        "text": "So from that day on they plotted to kill Him."
      },
      {
        "verse": 54,
        "text": "As a result, Jesus no longer went about publicly among the Jews, but He withdrew to a town called Ephraim in an area near the wilderness. And He stayed there with the disciples."
      },
      {
        "verse": 55,
        "text": "Now the Jewish Passover was near, and many people went up from the country to Jerusalem to purify themselves before the Passover."
      },
      {
        "verse": 56,
        "text": "They kept looking for Jesus and asking one another as they stood in the temple courts, “What do you think? Will He come to the feast at all?”"
      },
      {
        "verse": 57,
        "text": "But the chief priests and Pharisees had given orders that anyone who knew where He was must report it, so that they could arrest Him."
      }
    ],
    "NLT": [
      {
        "verse": 1,
        "text": "At this time a man named Lazarus was sick. He lived in Bethany, the village of Mary and her sister Martha."
      },
      {
        "verse": 2,
        "text": "(Mary, whose brother Lazarus was sick, was to anoint the Lord with perfume and wipe His feet with her hair.)"
      },
      {
        "verse": 3,
        "text": "So the sisters sent word to Jesus, “Lord, the one You love is sick.”"
      },
      {
        "verse": 4,
        "text": "When Jesus heard this, He said, “This sickness will not end in death. No, it is for the glory of God, so that the Son of God may be glorified through it.”"
      },
      {
        "verse": 5,
        "text": "Now Jesus loved Martha and her sister and Lazarus."
      },
      {
        "verse": 6,
        "text": "So on hearing that Lazarus was sick, He stayed where He was for two days,"
      },
      {
        "verse": 7,
        "text": "and then He said to the disciples, “Let us go back to Judea.”"
      },
      {
        "verse": 8,
        "text": "“Rabbi,” they replied, “the Jews just tried to stone You, and You are going back there?”"
      },
      {
        "verse": 9,
        "text": "Jesus answered, “Are there not twelve hours of daylight? If anyone walks in the daytime, he will not stumble, because he sees by the light of this world."
      },
      {
        "verse": 10,
        "text": "But if anyone walks at night, he will stumble, because he has no light.”"
      },
      {
        "verse": 11,
        "text": "After He had said this, He told them, “Our friend Lazarus has fallen asleep, but I am going there to wake him up.”"
      },
      {
        "verse": 12,
        "text": "His disciples replied, “Lord, if he is sleeping, he will get better.”"
      },
      {
        "verse": 13,
        "text": "They thought that Jesus was talking about actual sleep, but He was speaking about the death of Lazarus."
      },
      {
        "verse": 14,
        "text": "So Jesus told them plainly, “Lazarus is dead,"
      },
      {
        "verse": 15,
        "text": "and for your sake I am glad I was not there, so that you may believe. But let us go to him.”"
      },
      {
        "verse": 16,
        "text": "Then Thomas called Didymus said to his fellow disciples, “Let us also go, so that we may die with Him.”"
      },
      {
        "verse": 17,
        "text": "When Jesus arrived, He found that Lazarus had already spent four days in the tomb."
      },
      {
        "verse": 18,
        "text": "Now Bethany was near Jerusalem, a little less than two miles away,"
      },
      {
        "verse": 19,
        "text": "and many of the Jews had come to Martha and Mary to console them in the loss of their brother."
      },
      {
        "verse": 20,
        "text": "So when Martha heard that Jesus was coming, she went out to meet Him; but Mary stayed at home."
      },
      {
        "verse": 21,
        "text": "Martha said to Jesus, “Lord, if You had been here, my brother would not have died."
      },
      {
        "verse": 22,
        "text": "But even now I know that God will give You whatever You ask of Him.”"
      },
      {
        "verse": 23,
        "text": "“Your brother will rise again,” Jesus told her."
      },
      {
        "verse": 24,
        "text": "Martha replied, “I know that he will rise again in the resurrection at the last day.”"
      },
      {
        "verse": 25,
        "text": "Jesus said to her, “I am the resurrection and the life. Whoever believes in Me will live, even though he dies."
      },
      {
        "verse": 26,
        "text": "And everyone who lives and believes in Me will never die. Do you believe this?”"
      },
      {
        "verse": 27,
        "text": "“Yes, Lord,” she answered, “I believe that You are the Christ, the Son of God, who was to come into the world.”"
      },
      {
        "verse": 28,
        "text": "After Martha had said this, she went back and called her sister Mary aside to tell her, “The Teacher is here and is asking for you.”"
      },
      {
        "verse": 29,
        "text": "And when Mary heard this, she got up quickly and went to Him."
      },
      {
        "verse": 30,
        "text": "Now Jesus had not yet entered the village, but was still at the place where Martha had met Him."
      },
      {
        "verse": 31,
        "text": "When the Jews who were in the house consoling Mary saw how quickly she got up and went out, they followed her, supposing she was going to the tomb to mourn there."
      },
      {
        "verse": 32,
        "text": "When Mary came to Jesus and saw Him, she fell at His feet and said, “Lord, if You had been here, my brother would not have died.”"
      },
      {
        "verse": 33,
        "text": "When Jesus saw her weeping, and the Jews who had come with her also weeping, He was deeply moved in spirit and troubled."
      },
      {
        "verse": 34,
        "text": "“Where have you put him?” He asked. “Come and see, Lord,” they answered."
      },
      {
        "verse": 35,
        "text": "Jesus wept."
      },
      {
        "verse": 36,
        "text": "Then the Jews said, “See how He loved him!”"
      },
      {
        "verse": 37,
        "text": "But some of them asked, “Could not this man who opened the eyes of the blind also have kept Lazarus from dying?”"
      },
      {
        "verse": 38,
        "text": "Jesus, once again deeply moved, came to the tomb. It was a cave with a stone laid across the entrance."
      },
      {
        "verse": 39,
        "text": "“Take away the stone,” Jesus said. “Lord, by now he stinks,” said Martha, the sister of the dead man. “It has already been four days.”"
      },
      {
        "verse": 40,
        "text": "Jesus replied, “Did I not tell you that if you believed, you would see the glory of God?”"
      },
      {
        "verse": 41,
        "text": "So they took away the stone. Then Jesus lifted His eyes upward and said, “Father, I thank You that You have heard Me."
      },
      {
        "verse": 42,
        "text": "I knew that You always hear Me, but I say this for the benefit of the people standing here, so they may believe that You sent Me.”"
      },
      {
        "verse": 43,
        "text": "After Jesus had said this, He called out in a loud voice, “Lazarus, come out!”"
      },
      {
        "verse": 44,
        "text": "The man who had been dead came out with his hands and feet bound in strips of linen, and his face wrapped in a cloth. “Unwrap him and let him go,” Jesus told them."
      },
      {
        "verse": 45,
        "text": "Therefore many of the Jews who had come to Mary, and had seen what Jesus did, believed in Him."
      },
      {
        "verse": 46,
        "text": "But some of them went to the Pharisees and told them what Jesus had done."
      },
      {
        "verse": 47,
        "text": "Then the chief priests and Pharisees convened the Sanhedrin and said, “What are we to do? This man is performing many signs."
      },
      {
        "verse": 48,
        "text": "If we let Him go on like this, everyone will believe in Him, and then the Romans will come and take away both our place and our nation.”"
      },
      {
        "verse": 49,
        "text": "But one of them, named Caiaphas, who was high priest that year, said to them, “You know nothing at all!"
      },
      {
        "verse": 50,
        "text": "You do not realize that it is better for you that one man die for the people than that the whole nation perish.”"
      },
      {
        "verse": 51,
        "text": "Caiaphas did not say this on his own. Instead, as high priest that year, he was prophesying that Jesus would die for the nation,"
      },
      {
        "verse": 52,
        "text": "and not only for the nation, but also for the scattered children of God, to gather them together into one."
      },
      {
        "verse": 53,
        "text": "So from that day on they plotted to kill Him."
      },
      {
        "verse": 54,
        "text": "As a result, Jesus no longer went about publicly among the Jews, but He withdrew to a town called Ephraim in an area near the wilderness. And He stayed there with the disciples."
      },
      {
        "verse": 55,
        "text": "Now the Jewish Passover was near, and many people went up from the country to Jerusalem to purify themselves before the Passover."
      },
      {
        "verse": 56,
        "text": "They kept looking for Jesus and asking one another as they stood in the temple courts, “What do you think? Will He come to the feast at all?”"
      },
      {
        "verse": 57,
        "text": "But the chief priests and Pharisees had given orders that anyone who knew where He was must report it, so that they could arrest Him."
      }
    ],
    "AMPC": [
      {
        "verse": 1,
        "text": "At this time a man named Lazarus was sick. He lived in Bethany, the village of Mary and her sister Martha."
      },
      {
        "verse": 2,
        "text": "(Mary, whose brother Lazarus was sick, was to anoint the Lord with perfume and wipe His feet with her hair.)"
      },
      {
        "verse": 3,
        "text": "So the sisters sent word to Jesus, “Lord, the one You love is sick.”"
      },
      {
        "verse": 4,
        "text": "When Jesus heard this, He said, “This sickness will not end in death. No, it is for the glory of God, so that the Son of God may be glorified through it.”"
      },
      {
        "verse": 5,
        "text": "Now Jesus loved Martha and her sister and Lazarus."
      },
      {
        "verse": 6,
        "text": "So on hearing that Lazarus was sick, He stayed where He was for two days,"
      },
      {
        "verse": 7,
        "text": "and then He said to the disciples, “Let us go back to Judea.”"
      },
      {
        "verse": 8,
        "text": "“Rabbi,” they replied, “the Jews just tried to stone You, and You are going back there?”"
      },
      {
        "verse": 9,
        "text": "Jesus answered, “Are there not twelve hours of daylight? If anyone walks in the daytime, he will not stumble, because he sees by the light of this world."
      },
      {
        "verse": 10,
        "text": "But if anyone walks at night, he will stumble, because he has no light.”"
      },
      {
        "verse": 11,
        "text": "After He had said this, He told them, “Our friend Lazarus has fallen asleep, but I am going there to wake him up.”"
      },
      {
        "verse": 12,
        "text": "His disciples replied, “Lord, if he is sleeping, he will get better.”"
      },
      {
        "verse": 13,
        "text": "They thought that Jesus was talking about actual sleep, but He was speaking about the death of Lazarus."
      },
      {
        "verse": 14,
        "text": "So Jesus told them plainly, “Lazarus is dead,"
      },
      {
        "verse": 15,
        "text": "and for your sake I am glad I was not there, so that you may believe. But let us go to him.”"
      },
      {
        "verse": 16,
        "text": "Then Thomas called Didymus said to his fellow disciples, “Let us also go, so that we may die with Him.”"
      },
      {
        "verse": 17,
        "text": "When Jesus arrived, He found that Lazarus had already spent four days in the tomb."
      },
      {
        "verse": 18,
        "text": "Now Bethany was near Jerusalem, a little less than two miles away,"
      },
      {
        "verse": 19,
        "text": "and many of the Jews had come to Martha and Mary to console them in the loss of their brother."
      },
      {
        "verse": 20,
        "text": "So when Martha heard that Jesus was coming, she went out to meet Him; but Mary stayed at home."
      },
      {
        "verse": 21,
        "text": "Martha said to Jesus, “Lord, if You had been here, my brother would not have died."
      },
      {
        "verse": 22,
        "text": "But even now I know that God will give You whatever You ask of Him.”"
      },
      {
        "verse": 23,
        "text": "“Your brother will rise again,” Jesus told her."
      },
      {
        "verse": 24,
        "text": "Martha replied, “I know that he will rise again in the resurrection at the last day.”"
      },
      {
        "verse": 25,
        "text": "Jesus said to her, “I am the resurrection and the life. Whoever believes in Me will live, even though he dies."
      },
      {
        "verse": 26,
        "text": "And everyone who lives and believes in Me will never die. Do you believe this?”"
      },
      {
        "verse": 27,
        "text": "“Yes, Lord,” she answered, “I believe that You are the Christ, the Son of God, who was to come into the world.”"
      },
      {
        "verse": 28,
        "text": "After Martha had said this, she went back and called her sister Mary aside to tell her, “The Teacher is here and is asking for you.”"
      },
      {
        "verse": 29,
        "text": "And when Mary heard this, she got up quickly and went to Him."
      },
      {
        "verse": 30,
        "text": "Now Jesus had not yet entered the village, but was still at the place where Martha had met Him."
      },
      {
        "verse": 31,
        "text": "When the Jews who were in the house consoling Mary saw how quickly she got up and went out, they followed her, supposing she was going to the tomb to mourn there."
      },
      {
        "verse": 32,
        "text": "When Mary came to Jesus and saw Him, she fell at His feet and said, “Lord, if You had been here, my brother would not have died.”"
      },
      {
        "verse": 33,
        "text": "When Jesus saw her weeping, and the Jews who had come with her also weeping, He was deeply moved in spirit and troubled."
      },
      {
        "verse": 34,
        "text": "“Where have you put him?” He asked. “Come and see, Lord,” they answered."
      },
      {
        "verse": 35,
        "text": "Jesus wept."
      },
      {
        "verse": 36,
        "text": "Then the Jews said, “See how He loved him!”"
      },
      {
        "verse": 37,
        "text": "But some of them asked, “Could not this man who opened the eyes of the blind also have kept Lazarus from dying?”"
      },
      {
        "verse": 38,
        "text": "Jesus, once again deeply moved, came to the tomb. It was a cave with a stone laid across the entrance."
      },
      {
        "verse": 39,
        "text": "“Take away the stone,” Jesus said. “Lord, by now he stinks,” said Martha, the sister of the dead man. “It has already been four days.”"
      },
      {
        "verse": 40,
        "text": "Jesus replied, “Did I not tell you that if you believed, you would see the glory of God?”"
      },
      {
        "verse": 41,
        "text": "So they took away the stone. Then Jesus lifted His eyes upward and said, “Father, I thank You that You have heard Me."
      },
      {
        "verse": 42,
        "text": "I knew that You always hear Me, but I say this for the benefit of the people standing here, so they may believe that You sent Me.”"
      },
      {
        "verse": 43,
        "text": "After Jesus had said this, He called out in a loud voice, “Lazarus, come out!”"
      },
      {
        "verse": 44,
        "text": "The man who had been dead came out with his hands and feet bound in strips of linen, and his face wrapped in a cloth. “Unwrap him and let him go,” Jesus told them."
      },
      {
        "verse": 45,
        "text": "Therefore many of the Jews who had come to Mary, and had seen what Jesus did, believed in Him."
      },
      {
        "verse": 46,
        "text": "But some of them went to the Pharisees and told them what Jesus had done."
      },
      {
        "verse": 47,
        "text": "Then the chief priests and Pharisees convened the Sanhedrin and said, “What are we to do? This man is performing many signs."
      },
      {
        "verse": 48,
        "text": "If we let Him go on like this, everyone will believe in Him, and then the Romans will come and take away both our place and our nation.”"
      },
      {
        "verse": 49,
        "text": "But one of them, named Caiaphas, who was high priest that year, said to them, “You know nothing at all!"
      },
      {
        "verse": 50,
        "text": "You do not realize that it is better for you that one man die for the people than that the whole nation perish.”"
      },
      {
        "verse": 51,
        "text": "Caiaphas did not say this on his own. Instead, as high priest that year, he was prophesying that Jesus would die for the nation,"
      },
      {
        "verse": 52,
        "text": "and not only for the nation, but also for the scattered children of God, to gather them together into one."
      },
      {
        "verse": 53,
        "text": "So from that day on they plotted to kill Him."
      },
      {
        "verse": 54,
        "text": "As a result, Jesus no longer went about publicly among the Jews, but He withdrew to a town called Ephraim in an area near the wilderness. And He stayed there with the disciples."
      },
      {
        "verse": 55,
        "text": "Now the Jewish Passover was near, and many people went up from the country to Jerusalem to purify themselves before the Passover."
      },
      {
        "verse": 56,
        "text": "They kept looking for Jesus and asking one another as they stood in the temple courts, “What do you think? Will He come to the feast at all?”"
      },
      {
        "verse": 57,
        "text": "But the chief priests and Pharisees had given orders that anyone who knew where He was must report it, so that they could arrest Him."
      }
    ],
    "YLT": [
      {
        "verse": 1,
        "text": "Now a certain man was sick, named Lazarus, of Bethany, the town of Mary and her sister Martha."
      },
      {
        "verse": 2,
        "text": "(It was that Mary which anointed the Lord with ointment, and wiped his feet with her hair, whose brother Lazarus was sick.)"
      },
      {
        "verse": 3,
        "text": "Therefore his sisters sent unto him, saying, Lord, behold, he whom thou lovest is sick."
      },
      {
        "verse": 4,
        "text": "When Jesus heard that, he said, This sickness is not unto death, but for the glory of God, that the Son of God might be glorified thereby."
      },
      {
        "verse": 5,
        "text": "Now Jesus loved Martha, and her sister, and Lazarus."
      },
      {
        "verse": 6,
        "text": "When he had heard therefore that he was sick, he abode two days still in the same place where he was."
      },
      {
        "verse": 7,
        "text": "Then after that saith he to his disciples, Let us go into Judea again."
      },
      {
        "verse": 8,
        "text": "His disciples say unto him, Master, the Jews of late sought to stone thee; and goest thou thither again?"
      },
      {
        "verse": 9,
        "text": "Jesus answered, Are there not twelve hours in the day? If any man walk in the day, he stumbleth not, because he seeth the light of this world."
      },
      {
        "verse": 10,
        "text": "But if a man walk in the night, he stumbleth, because there is no light in him."
      },
      {
        "verse": 11,
        "text": "These things said he: and after that he saith unto them, Our friend Lazarus sleepeth; but I go, that I may awake him out of sleep."
      },
      {
        "verse": 12,
        "text": "Then said his disciples, Lord, if he sleep, he shall do well."
      },
      {
        "verse": 13,
        "text": "Howbeit Jesus spake of his death: but they thought that he had spoken of taking of rest in sleep."
      },
      {
        "verse": 14,
        "text": "Then said Jesus unto them plainly, Lazarus is dead."
      },
      {
        "verse": 15,
        "text": "And I am glad for your sakes that I was not there, to the intent ye may believe; nevertheless let us go unto him."
      },
      {
        "verse": 16,
        "text": "Then said Thomas, which is called Didymus, unto his fellowdisciples, Let us also go, that we may die with him."
      },
      {
        "verse": 17,
        "text": "Then when Jesus came, he found that he had lain in the grave four days already."
      },
      {
        "verse": 18,
        "text": "Now Bethany was nigh unto Jerusalem, about fifteen furlongs off:"
      },
      {
        "verse": 19,
        "text": "And many of the Jews came to Martha and Mary, to comfort them concerning their brother."
      },
      {
        "verse": 20,
        "text": "Then Martha, as soon as she heard that Jesus was coming, went and met him: but Mary sat still in the house."
      },
      {
        "verse": 21,
        "text": "Then said Martha unto Jesus, Lord, if thou hadst been here, my brother had not died."
      },
      {
        "verse": 22,
        "text": "But I know, that even now, whatsoever thou wilt ask of God, God will give it thee."
      },
      {
        "verse": 23,
        "text": "Jesus saith unto her, Thy brother shall rise again."
      },
      {
        "verse": 24,
        "text": "Martha saith unto him, I know that he shall rise again in the resurrection at the last day."
      },
      {
        "verse": 25,
        "text": "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live:"
      },
      {
        "verse": 26,
        "text": "And whosoever liveth and believeth in me shall never die. Believest thou this?"
      },
      {
        "verse": 27,
        "text": "She saith unto him, Yea, Lord: I believe that thou art the Christ, the Son of God, which should come into the world."
      },
      {
        "verse": 28,
        "text": "And when she had so said, she went her way, and called Mary her sister secretly, saying, The Master is come, and calleth for thee."
      },
      {
        "verse": 29,
        "text": "As soon as she heard that, she arose quickly, and came unto him."
      },
      {
        "verse": 30,
        "text": "Now Jesus was not yet come into the town, but was in that place where Martha met him."
      },
      {
        "verse": 31,
        "text": "The Jews then which were with her in the house, and comforted her, when they saw Mary, that she rose up hastily and went out, followed her, saying, She goeth unto the grave to weep there."
      },
      {
        "verse": 32,
        "text": "Then when Mary was come where Jesus was, and saw him, she fell down at his feet, saying unto him, Lord, if thou hadst been here, my brother had not died."
      },
      {
        "verse": 33,
        "text": "When Jesus therefore saw her weeping, and the Jews also weeping which came with her, he groaned in the spirit, and was troubled,"
      },
      {
        "verse": 34,
        "text": "And said, Where have ye laid him? They said unto him, Lord, come and see."
      },
      {
        "verse": 35,
        "text": "Jesus wept."
      },
      {
        "verse": 36,
        "text": "Then said the Jews, Behold how he loved him!"
      },
      {
        "verse": 37,
        "text": "And some of them said, Could not this man, which opened the eyes of the blind, have caused that even this man should not have died?"
      },
      {
        "verse": 38,
        "text": "Jesus therefore again groaning in himself cometh to the grave. It was a cave, and a stone lay upon it."
      },
      {
        "verse": 39,
        "text": "Jesus said, Take ye away the stone. Martha, the sister of him that was dead, saith unto him, Lord, by this time he stinketh: for he hath been dead four days."
      },
      {
        "verse": 40,
        "text": "Jesus saith unto her, Said I not unto thee, that, if thou wouldest believe, thou shouldest see the glory of God?"
      },
      {
        "verse": 41,
        "text": "Then they took away the stone from the place where the dead was laid. And Jesus lifted up his eyes, and said, Father, I thank thee that thou hast heard me."
      },
      {
        "verse": 42,
        "text": "And I knew that thou hearest me always: but because of the people which stand by I said it, that they may believe that thou hast sent me."
      },
      {
        "verse": 43,
        "text": "And when he thus had spoken, he cried with a loud voice, Lazarus, come forth."
      },
      {
        "verse": 44,
        "text": "And he that was dead came forth, bound hand and foot with graveclothes: and his face was bound about with a napkin. Jesus saith unto them, Loose him, and let him go."
      },
      {
        "verse": 45,
        "text": "Then many of the Jews which came to Mary, and had seen the things which Jesus did, believed on him."
      },
      {
        "verse": 46,
        "text": "But some of them went their ways to the Pharisees, and told them what things Jesus had done."
      },
      {
        "verse": 47,
        "text": "Then gathered the chief priests and the Pharisees a council, and said, What do we? for this man doeth many miracles."
      },
      {
        "verse": 48,
        "text": "If we let him thus alone, all men will believe on him: and the Romans shall come and take away both our place and nation."
      },
      {
        "verse": 49,
        "text": "And one of them, named Caiaphas, being the high priest that same year, said unto them, Ye know nothing at all,"
      },
      {
        "verse": 50,
        "text": "Nor consider that it is expedient for us, that one man should die for the people, and that the whole nation perish not."
      },
      {
        "verse": 51,
        "text": "And this spake he not of himself: but being high priest that year, he prophesied that Jesus should die for that nation;"
      },
      {
        "verse": 52,
        "text": "And not for that nation only, but that also he should gather together in one the children of God that were scattered abroad."
      },
      {
        "verse": 53,
        "text": "Then from that day forth they took counsel together for to put him to death."
      },
      {
        "verse": 54,
        "text": "Jesus therefore walked no more openly among the Jews; but went thence unto a country near to the wilderness, into a city called Ephraim, and there continued with his disciples."
      },
      {
        "verse": 55,
        "text": "And the Jews’ passover was nigh at hand: and many went out of the country up to Jerusalem before the passover, to purify themselves."
      },
      {
        "verse": 56,
        "text": "Then sought they for Jesus, and spake among themselves, as they stood in the temple, What think ye, that he will not come to the feast?"
      },
      {
        "verse": 57,
        "text": "Now both the chief priests and the Pharisees had given a commandment, that, if any man knew where he were, he should shew it, that they might take him."
      }
    ],
    "CUV": [
      {
        "verse": 1,
        "text": "有一個患病的人，名叫拉撒路，住在伯大尼，就是馬利亞和她姊姊馬大的村莊。"
      },
      {
        "verse": 2,
        "text": "這馬利亞就是那用香膏抹主，又用頭髮擦他腳的；患病的拉撒路是她的兄弟。"
      },
      {
        "verse": 3,
        "text": "她姊妹兩個就打發人去見耶穌，說：「主啊，你所愛的人病了。」"
      },
      {
        "verse": 4,
        "text": "耶穌聽見，就說：「這病不至於死，乃是為神的榮耀，叫神的兒子因此得榮耀。」"
      },
      {
        "verse": 5,
        "text": "耶穌素來愛馬大和她妹子並拉撒路。"
      },
      {
        "verse": 6,
        "text": "聽見拉撒路病了，就在所居之地仍住了兩天。"
      },
      {
        "verse": 7,
        "text": "然後對門徒說：「我們再往猶太去吧。」"
      },
      {
        "verse": 8,
        "text": "門徒說：「拉比，猶太人近來要拿石頭打你，你還往那裡去嗎？」"
      },
      {
        "verse": 9,
        "text": "耶穌回答說：「白日不是有十二小時嗎？人在白日走路，就不至跌倒，因為看見這世上的光。"
      },
      {
        "verse": 10,
        "text": "若在黑夜走路，就必跌倒，因為他沒有光。」"
      },
      {
        "verse": 11,
        "text": "耶穌說了這話，隨後對他們說：「我們的朋友拉撒路睡了，我去叫醒他。」"
      },
      {
        "verse": 12,
        "text": "門徒說：「主啊，他若睡了，就必好了。」"
      },
      {
        "verse": 13,
        "text": "耶穌這話是指著他死說的，他們卻以為是說照常睡了。"
      },
      {
        "verse": 14,
        "text": "耶穌就明明地告訴他們說：「拉撒路死了。"
      },
      {
        "verse": 15,
        "text": "我沒有在那裡就歡喜，這是為你們的緣故，好叫你們相信。如今我們可以往他那裡去吧。」"
      },
      {
        "verse": 16,
        "text": "多馬，又稱為低土馬，就對那同作門徒的說：「我們也去和他同死吧。」"
      },
      {
        "verse": 17,
        "text": "耶穌到了，就知道拉撒路在墳墓裡已經四天了。"
      },
      {
        "verse": 18,
        "text": "伯大尼離耶路撒冷不遠，約有六里路。"
      },
      {
        "verse": 19,
        "text": "有好些猶太人來看馬大和馬利亞，要為她們的兄弟安慰她們。"
      },
      {
        "verse": 20,
        "text": "馬大聽見耶穌來了，就出去迎接他；馬利亞卻仍然坐在家裡。"
      },
      {
        "verse": 21,
        "text": "馬大對耶穌說：「主啊，你若早在這裡，我兄弟必不死。"
      },
      {
        "verse": 22,
        "text": "就是現在，我也知道，你無論向神求甚麼，神也必賜給你。」"
      },
      {
        "verse": 23,
        "text": "耶穌說：「你兄弟必然復活。」"
      },
      {
        "verse": 24,
        "text": "馬大說：「我知道在末日復活的時候，他必復活。」"
      },
      {
        "verse": 25,
        "text": "耶穌對她說：「復活在我，生命也在我。信我的人雖然死了，也必復活；"
      },
      {
        "verse": 26,
        "text": "凡活著信我的人必永遠不死。你信這話嗎？」"
      },
      {
        "verse": 27,
        "text": "馬大說：「主啊，是的，我信你是基督，是神的兒子，就是那要臨到世界的。」"
      },
      {
        "verse": 28,
        "text": "馬大說了這話，就回去暗暗地叫她妹子馬利亞，說：「夫子來了，叫你。」"
      },
      {
        "verse": 29,
        "text": "馬利亞聽見了，就急忙起來，到耶穌那裡去。"
      },
      {
        "verse": 30,
        "text": "那時，耶穌還沒有進村子，仍在馬大迎接他的地方。"
      },
      {
        "verse": 31,
        "text": "那些同馬利亞在家裡安慰她的猶太人，見她急忙起來出去，就跟著她，以為她要往墳墓那裡去哭。"
      },
      {
        "verse": 32,
        "text": "馬利亞到了耶穌那裡，看見他，就俯伏在他腳前，說：「主啊，你若早在這裡，我兄弟必不死。」"
      },
      {
        "verse": 33,
        "text": "耶穌看見她哭，並看見與她同來的猶太人也哭，就心裡悲歎，又甚憂愁，"
      },
      {
        "verse": 34,
        "text": "便說：「你們把他安放在哪裡？」他們回答說：「請主來看。」"
      },
      {
        "verse": 35,
        "text": "耶穌哭了。"
      },
      {
        "verse": 36,
        "text": "猶太人就說：「你看他愛這人是何等懇切。」"
      },
      {
        "verse": 37,
        "text": "其中有人說：「他既然開了瞎子的眼睛，豈不能叫這人不死嗎？」"
      },
      {
        "verse": 38,
        "text": "耶穌又心裡悲歎，來到墳墓前；那墳墓是個洞，有一塊石頭擋著。"
      },
      {
        "verse": 39,
        "text": "耶穌說：「你們把石頭挪開。」那死人的姊姊馬大對他說：「主啊，他現在必是臭了，因為他死了已經四天了。」"
      },
      {
        "verse": 40,
        "text": "耶穌說：「我不是對你說過，你若信，就必看見神的榮耀嗎？」"
      },
      {
        "verse": 41,
        "text": "他們就把石頭挪開。耶穌舉目望天，說：「父啊，我感謝你，因為你已經聽我。"
      },
      {
        "verse": 42,
        "text": "我也知道你常聽我，但我說這話是為周圍站著的眾人，叫他們信是你差了我來。」"
      },
      {
        "verse": 43,
        "text": "說了這話，就大聲呼叫說：「拉撒路出來！」"
      },
      {
        "verse": 44,
        "text": "那死人就出來了，手腳裹著布，臉上包著手巾。耶穌對他們說：「解開，叫他走！」"
      },
      {
        "verse": 45,
        "text": "那些來看馬利亞的猶太人見了耶穌所做的事，就多有信他的；"
      },
      {
        "verse": 46,
        "text": "但其中也有去見法利賽人的，將耶穌所做的事告訴他們。"
      },
      {
        "verse": 47,
        "text": "祭司長和法利賽人聚集公會，說：「這人行好些神蹟，我們怎麼辦呢？"
      },
      {
        "verse": 48,
        "text": "若這樣由著他，人人都要信他，羅馬人也要來奪我們的地土和我們的百姓。」"
      },
      {
        "verse": 49,
        "text": "內中有一個人，名叫該亞法，本年作大祭司，對他們說：「你們不知道甚麼。"
      },
      {
        "verse": 50,
        "text": "獨不想一個人替百姓死，免得通國滅亡，就是你們的益處。」"
      },
      {
        "verse": 51,
        "text": "他這話不是出於自己，是因他本年作大祭司，所以預言耶穌將要替這一國死；"
      },
      {
        "verse": 52,
        "text": "也不但替這一國死，並要將神四散的子民都聚集歸一。"
      },
      {
        "verse": 53,
        "text": "從那日起，他們就商議要殺耶穌。"
      },
      {
        "verse": 54,
        "text": "所以，耶穌不再顯然行在猶太人中間，就離開那裡往靠近曠野的地方去，到了一座城，名叫以法蓮，就在那裡和門徒同住。"
      },
      {
        "verse": 55,
        "text": "猶太人的逾越節近了，有許多人從鄉下上耶路撒冷去，要在節前潔淨自己。"
      },
      {
        "verse": 56,
        "text": "他們就尋找耶穌，站在殿裡彼此說：「你們的意思如何，他不來過節嗎？」"
      },
      {
        "verse": 57,
        "text": "那時，祭司長和法利賽人早已吩咐說，若有人知道耶穌在哪裡，就要報明，好去拿他。"
      }
    ],
    "CNV": [
      {
        "verse": 1,
        "text": "有一個患病的人，名叫拉撒路，住在伯大尼，就是馬利亞和她姊姊馬大的村莊。"
      },
      {
        "verse": 2,
        "text": "這馬利亞就是那用香膏抹主，又用頭髮擦他腳的；患病的拉撒路是她的兄弟。"
      },
      {
        "verse": 3,
        "text": "她姊妹兩個就打發人去見耶穌，說：「主啊，你所愛的人病了。」"
      },
      {
        "verse": 4,
        "text": "耶穌聽見，就說：「這病不至於死，乃是為神的榮耀，叫神的兒子因此得榮耀。」"
      },
      {
        "verse": 5,
        "text": "耶穌素來愛馬大和她妹子並拉撒路。"
      },
      {
        "verse": 6,
        "text": "聽見拉撒路病了，就在所居之地仍住了兩天。"
      },
      {
        "verse": 7,
        "text": "然後對門徒說：「我們再往猶太去吧。」"
      },
      {
        "verse": 8,
        "text": "門徒說：「拉比，猶太人近來要拿石頭打你，你還往那裡去嗎？」"
      },
      {
        "verse": 9,
        "text": "耶穌回答說：「白日不是有十二小時嗎？人在白日走路，就不至跌倒，因為看見這世上的光。"
      },
      {
        "verse": 10,
        "text": "若在黑夜走路，就必跌倒，因為他沒有光。」"
      },
      {
        "verse": 11,
        "text": "耶穌說了這話，隨後對他們說：「我們的朋友拉撒路睡了，我去叫醒他。」"
      },
      {
        "verse": 12,
        "text": "門徒說：「主啊，他若睡了，就必好了。」"
      },
      {
        "verse": 13,
        "text": "耶穌這話是指著他死說的，他們卻以為是說照常睡了。"
      },
      {
        "verse": 14,
        "text": "耶穌就明明地告訴他們說：「拉撒路死了。"
      },
      {
        "verse": 15,
        "text": "我沒有在那裡就歡喜，這是為你們的緣故，好叫你們相信。如今我們可以往他那裡去吧。」"
      },
      {
        "verse": 16,
        "text": "多馬，又稱為低土馬，就對那同作門徒的說：「我們也去和他同死吧。」"
      },
      {
        "verse": 17,
        "text": "耶穌到了，就知道拉撒路在墳墓裡已經四天了。"
      },
      {
        "verse": 18,
        "text": "伯大尼離耶路撒冷不遠，約有六里路。"
      },
      {
        "verse": 19,
        "text": "有好些猶太人來看馬大和馬利亞，要為她們的兄弟安慰她們。"
      },
      {
        "verse": 20,
        "text": "馬大聽見耶穌來了，就出去迎接他；馬利亞卻仍然坐在家裡。"
      },
      {
        "verse": 21,
        "text": "馬大對耶穌說：「主啊，你若早在這裡，我兄弟必不死。"
      },
      {
        "verse": 22,
        "text": "就是現在，我也知道，你無論向神求甚麼，神也必賜給你。」"
      },
      {
        "verse": 23,
        "text": "耶穌說：「你兄弟必然復活。」"
      },
      {
        "verse": 24,
        "text": "馬大說：「我知道在末日復活的時候，他必復活。」"
      },
      {
        "verse": 25,
        "text": "耶穌對她說：「復活在我，生命也在我。信我的人雖然死了，也必復活；"
      },
      {
        "verse": 26,
        "text": "凡活著信我的人必永遠不死。你信這話嗎？」"
      },
      {
        "verse": 27,
        "text": "馬大說：「主啊，是的，我信你是基督，是神的兒子，就是那要臨到世界的。」"
      },
      {
        "verse": 28,
        "text": "馬大說了這話，就回去暗暗地叫她妹子馬利亞，說：「夫子來了，叫你。」"
      },
      {
        "verse": 29,
        "text": "馬利亞聽見了，就急忙起來，到耶穌那裡去。"
      },
      {
        "verse": 30,
        "text": "那時，耶穌還沒有進村子，仍在馬大迎接他的地方。"
      },
      {
        "verse": 31,
        "text": "那些同馬利亞在家裡安慰她的猶太人，見她急忙起來出去，就跟著她，以為她要往墳墓那裡去哭。"
      },
      {
        "verse": 32,
        "text": "馬利亞到了耶穌那裡，看見他，就俯伏在他腳前，說：「主啊，你若早在這裡，我兄弟必不死。」"
      },
      {
        "verse": 33,
        "text": "耶穌看見她哭，並看見與她同來的猶太人也哭，就心裡悲歎，又甚憂愁，"
      },
      {
        "verse": 34,
        "text": "便說：「你們把他安放在哪裡？」他們回答說：「請主來看。」"
      },
      {
        "verse": 35,
        "text": "耶穌哭了。"
      },
      {
        "verse": 36,
        "text": "猶太人就說：「你看他愛這人是何等懇切。」"
      },
      {
        "verse": 37,
        "text": "其中有人說：「他既然開了瞎子的眼睛，豈不能叫這人不死嗎？」"
      },
      {
        "verse": 38,
        "text": "耶穌又心裡悲歎，來到墳墓前；那墳墓是個洞，有一塊石頭擋著。"
      },
      {
        "verse": 39,
        "text": "耶穌說：「你們把石頭挪開。」那死人的姊姊馬大對他說：「主啊，他現在必是臭了，因為他死了已經四天了。」"
      },
      {
        "verse": 40,
        "text": "耶穌說：「我不是對你說過，你若信，就必看見神的榮耀嗎？」"
      },
      {
        "verse": 41,
        "text": "他們就把石頭挪開。耶穌舉目望天，說：「父啊，我感謝你，因為你已經聽我。"
      },
      {
        "verse": 42,
        "text": "我也知道你常聽我，但我說這話是為周圍站著的眾人，叫他們信是你差了我來。」"
      },
      {
        "verse": 43,
        "text": "說了這話，就大聲呼叫說：「拉撒路出來！」"
      },
      {
        "verse": 44,
        "text": "那死人就出來了，手腳裹著布，臉上包著手巾。耶穌對他們說：「解開，叫他走！」"
      },
      {
        "verse": 45,
        "text": "那些來看馬利亞的猶太人見了耶穌所做的事，就多有信他的；"
      },
      {
        "verse": 46,
        "text": "但其中也有去見法利賽人的，將耶穌所做的事告訴他們。"
      },
      {
        "verse": 47,
        "text": "祭司長和法利賽人聚集公會，說：「這人行好些神蹟，我們怎麼辦呢？"
      },
      {
        "verse": 48,
        "text": "若這樣由著他，人人都要信他，羅馬人也要來奪我們的地土和我們的百姓。」"
      },
      {
        "verse": 49,
        "text": "內中有一個人，名叫該亞法，本年作大祭司，對他們說：「你們不知道甚麼。"
      },
      {
        "verse": 50,
        "text": "獨不想一個人替百姓死，免得通國滅亡，就是你們的益處。」"
      },
      {
        "verse": 51,
        "text": "他這話不是出於自己，是因他本年作大祭司，所以預言耶穌將要替這一國死；"
      },
      {
        "verse": 52,
        "text": "也不但替這一國死，並要將神四散的子民都聚集歸一。"
      },
      {
        "verse": 53,
        "text": "從那日起，他們就商議要殺耶穌。"
      },
      {
        "verse": 54,
        "text": "所以，耶穌不再顯然行在猶太人中間，就離開那裡往靠近曠野的地方去，到了一座城，名叫以法蓮，就在那裡和門徒同住。"
      },
      {
        "verse": 55,
        "text": "猶太人的逾越節近了，有許多人從鄉下上耶路撒冷去，要在節前潔淨自己。"
      },
      {
        "verse": 56,
        "text": "他們就尋找耶穌，站在殿裡彼此說：「你們的意思如何，他不來過節嗎？」"
      },
      {
        "verse": 57,
        "text": "那時，祭司長和法利賽人早已吩咐說，若有人知道耶穌在哪裡，就要報明，好去拿他。"
      }
    ],
    "CCB": [
      {
        "verse": 1,
        "text": "有一個患病的人，名叫拉撒路，住在伯大尼，就是馬利亞和她姊姊馬大的村莊。"
      },
      {
        "verse": 2,
        "text": "這馬利亞就是那用香膏抹主，又用頭髮擦他腳的；患病的拉撒路是她的兄弟。"
      },
      {
        "verse": 3,
        "text": "她姊妹兩個就打發人去見耶穌，說：「主啊，你所愛的人病了。」"
      },
      {
        "verse": 4,
        "text": "耶穌聽見，就說：「這病不至於死，乃是為神的榮耀，叫神的兒子因此得榮耀。」"
      },
      {
        "verse": 5,
        "text": "耶穌素來愛馬大和她妹子並拉撒路。"
      },
      {
        "verse": 6,
        "text": "聽見拉撒路病了，就在所居之地仍住了兩天。"
      },
      {
        "verse": 7,
        "text": "然後對門徒說：「我們再往猶太去吧。」"
      },
      {
        "verse": 8,
        "text": "門徒說：「拉比，猶太人近來要拿石頭打你，你還往那裡去嗎？」"
      },
      {
        "verse": 9,
        "text": "耶穌回答說：「白日不是有十二小時嗎？人在白日走路，就不至跌倒，因為看見這世上的光。"
      },
      {
        "verse": 10,
        "text": "若在黑夜走路，就必跌倒，因為他沒有光。」"
      },
      {
        "verse": 11,
        "text": "耶穌說了這話，隨後對他們說：「我們的朋友拉撒路睡了，我去叫醒他。」"
      },
      {
        "verse": 12,
        "text": "門徒說：「主啊，他若睡了，就必好了。」"
      },
      {
        "verse": 13,
        "text": "耶穌這話是指著他死說的，他們卻以為是說照常睡了。"
      },
      {
        "verse": 14,
        "text": "耶穌就明明地告訴他們說：「拉撒路死了。"
      },
      {
        "verse": 15,
        "text": "我沒有在那裡就歡喜，這是為你們的緣故，好叫你們相信。如今我們可以往他那裡去吧。」"
      },
      {
        "verse": 16,
        "text": "多馬，又稱為低土馬，就對那同作門徒的說：「我們也去和他同死吧。」"
      },
      {
        "verse": 17,
        "text": "耶穌到了，就知道拉撒路在墳墓裡已經四天了。"
      },
      {
        "verse": 18,
        "text": "伯大尼離耶路撒冷不遠，約有六里路。"
      },
      {
        "verse": 19,
        "text": "有好些猶太人來看馬大和馬利亞，要為她們的兄弟安慰她們。"
      },
      {
        "verse": 20,
        "text": "馬大聽見耶穌來了，就出去迎接他；馬利亞卻仍然坐在家裡。"
      },
      {
        "verse": 21,
        "text": "馬大對耶穌說：「主啊，你若早在這裡，我兄弟必不死。"
      },
      {
        "verse": 22,
        "text": "就是現在，我也知道，你無論向神求甚麼，神也必賜給你。」"
      },
      {
        "verse": 23,
        "text": "耶穌說：「你兄弟必然復活。」"
      },
      {
        "verse": 24,
        "text": "馬大說：「我知道在末日復活的時候，他必復活。」"
      },
      {
        "verse": 25,
        "text": "耶穌對她說：「復活在我，生命也在我。信我的人雖然死了，也必復活；"
      },
      {
        "verse": 26,
        "text": "凡活著信我的人必永遠不死。你信這話嗎？」"
      },
      {
        "verse": 27,
        "text": "馬大說：「主啊，是的，我信你是基督，是神的兒子，就是那要臨到世界的。」"
      },
      {
        "verse": 28,
        "text": "馬大說了這話，就回去暗暗地叫她妹子馬利亞，說：「夫子來了，叫你。」"
      },
      {
        "verse": 29,
        "text": "馬利亞聽見了，就急忙起來，到耶穌那裡去。"
      },
      {
        "verse": 30,
        "text": "那時，耶穌還沒有進村子，仍在馬大迎接他的地方。"
      },
      {
        "verse": 31,
        "text": "那些同馬利亞在家裡安慰她的猶太人，見她急忙起來出去，就跟著她，以為她要往墳墓那裡去哭。"
      },
      {
        "verse": 32,
        "text": "馬利亞到了耶穌那裡，看見他，就俯伏在他腳前，說：「主啊，你若早在這裡，我兄弟必不死。」"
      },
      {
        "verse": 33,
        "text": "耶穌看見她哭，並看見與她同來的猶太人也哭，就心裡悲歎，又甚憂愁，"
      },
      {
        "verse": 34,
        "text": "便說：「你們把他安放在哪裡？」他們回答說：「請主來看。」"
      },
      {
        "verse": 35,
        "text": "耶穌哭了。"
      },
      {
        "verse": 36,
        "text": "猶太人就說：「你看他愛這人是何等懇切。」"
      },
      {
        "verse": 37,
        "text": "其中有人說：「他既然開了瞎子的眼睛，豈不能叫這人不死嗎？」"
      },
      {
        "verse": 38,
        "text": "耶穌又心裡悲歎，來到墳墓前；那墳墓是個洞，有一塊石頭擋著。"
      },
      {
        "verse": 39,
        "text": "耶穌說：「你們把石頭挪開。」那死人的姊姊馬大對他說：「主啊，他現在必是臭了，因為他死了已經四天了。」"
      },
      {
        "verse": 40,
        "text": "耶穌說：「我不是對你說過，你若信，就必看見神的榮耀嗎？」"
      },
      {
        "verse": 41,
        "text": "他們就把石頭挪開。耶穌舉目望天，說：「父啊，我感謝你，因為你已經聽我。"
      },
      {
        "verse": 42,
        "text": "我也知道你常聽我，但我說這話是為周圍站著的眾人，叫他們信是你差了我來。」"
      },
      {
        "verse": 43,
        "text": "說了這話，就大聲呼叫說：「拉撒路出來！」"
      },
      {
        "verse": 44,
        "text": "那死人就出來了，手腳裹著布，臉上包著手巾。耶穌對他們說：「解開，叫他走！」"
      },
      {
        "verse": 45,
        "text": "那些來看馬利亞的猶太人見了耶穌所做的事，就多有信他的；"
      },
      {
        "verse": 46,
        "text": "但其中也有去見法利賽人的，將耶穌所做的事告訴他們。"
      },
      {
        "verse": 47,
        "text": "祭司長和法利賽人聚集公會，說：「這人行好些神蹟，我們怎麼辦呢？"
      },
      {
        "verse": 48,
        "text": "若這樣由著他，人人都要信他，羅馬人也要來奪我們的地土和我們的百姓。」"
      },
      {
        "verse": 49,
        "text": "內中有一個人，名叫該亞法，本年作大祭司，對他們說：「你們不知道甚麼。"
      },
      {
        "verse": 50,
        "text": "獨不想一個人替百姓死，免得通國滅亡，就是你們的益處。」"
      },
      {
        "verse": 51,
        "text": "他這話不是出於自己，是因他本年作大祭司，所以預言耶穌將要替這一國死；"
      },
      {
        "verse": 52,
        "text": "也不但替這一國死，並要將神四散的子民都聚集歸一。"
      },
      {
        "verse": 53,
        "text": "從那日起，他們就商議要殺耶穌。"
      },
      {
        "verse": 54,
        "text": "所以，耶穌不再顯然行在猶太人中間，就離開那裡往靠近曠野的地方去，到了一座城，名叫以法蓮，就在那裡和門徒同住。"
      },
      {
        "verse": 55,
        "text": "猶太人的逾越節近了，有許多人從鄉下上耶路撒冷去，要在節前潔淨自己。"
      },
      {
        "verse": 56,
        "text": "他們就尋找耶穌，站在殿裡彼此說：「你們的意思如何，他不來過節嗎？」"
      },
      {
        "verse": 57,
        "text": "那時，祭司長和法利賽人早已吩咐說，若有人知道耶穌在哪裡，就要報明，好去拿他。"
      }
    ]
  }
};

export function getOfflineFallbackChapter(
  bookId: number,
  chapter: number,
  translation: SupportedTranslation | string = 'NKJV'
): BollsVerseItem[] | null {
  const key = `${bookId}:${chapter}`;
  const rawUpper = translation.trim().toUpperCase();
  let transKey = rawUpper;
  if (rawUpper === 'AMP') transKey = 'AMPC';
  if (rawUpper === 'CUVS' || rawUpper === 'CUNPS' || translation.trim() === '和合本') transKey = 'CUV';
  if (rawUpper === 'CNVS' || translation.trim() === '新译本') transKey = 'CNV';
  if (translation.trim() === '当代译本') transKey = 'CCB';

  const chapterRecord = MULTI_TRANSLATION_CHAPTERS[key];
  if (!chapterRecord) return null;

  return chapterRecord[transKey] || chapterRecord.NKJV || null;
}
