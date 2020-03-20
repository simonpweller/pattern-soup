import {
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonPage,
    IonReorder,
    IonReorderGroup,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {add, albumsOutline, search, trash} from 'ionicons/icons';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Pattern} from '../hooks/usePatterns';

type HomeProps = {
    patterns: Pattern[],
    deletePattern: (id: string) => void,
    movePattern: (from: number, to: number) => void,
    sortPatterns: () => void,
    searchText: string,
    setSearchText: (search: string) => void,
}

const Home: React.FC<HomeProps> = ({patterns, deletePattern, movePattern, sortPatterns, searchText, setSearchText}) => {
    const [showSearch, setShowSearch] = useState(false);
    const disableReorder = searchText.length > 0;

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="primary">
                    <IonButton onClick={() => setShowSearch(!showSearch)}>
                        <IonIcon slot="icon-only" icon={search}/>
                    </IonButton>
                    <IonButton onClick={sortPatterns}>
                        <IonIcon slot="icon-only" icon={albumsOutline}/>
                    </IonButton>
                </IonButtons>
                <IonTitle>Pattern Soup</IonTitle>
            </IonToolbar>
            {showSearch && <IonToolbar>
                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value || '')}/>
            </IonToolbar>}
        </IonHeader>
        <IonContent>
            <IonList>
                <IonReorderGroup disabled={disableReorder} onIonItemReorder={e => {
                    movePattern(e.detail.from, e.detail.to);
                    e.detail.complete();
                }}>
                    {patterns.map(pattern =>
                        <IonItemSliding key={pattern.id}>
                            <IonItem routerLink={`/patterns/${pattern.id}`}>
                                <IonLabel>
                                    <h2>{pattern.name}</h2>
                                    {pattern.hanger ? <p>{`Hanger: ${pattern.hanger}`}</p> : ''}
                                </IonLabel>
                                {!disableReorder && <IonReorder/>}
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => deletePattern(pattern.id)}>
                                    <IonIcon slot="icon-only" icon={trash}/>
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    )}
                </IonReorderGroup>
            </IonList>
        </IonContent>
        <IonFab vertical={"bottom"} horizontal={"center"}>
            <Link to="/patterns/new">
                <IonFabButton>
                    <IonIcon icon={add}/>
                </IonFabButton>
            </Link>
        </IonFab>
    </IonPage>;
};

export default Home;
