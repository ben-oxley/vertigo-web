
import { VertigoDataStore } from './VertigoDataStore';
import { VertigoInMemoryDataStore } from './VertigoInMemoryDataStore';

export class VertigoDataStoreManager {
    private static store: VertigoDataStore;
    public static GetDataStore(): VertigoDataStore {
        if (this.store == null)
            VertigoDataStoreManager.store = new VertigoInMemoryDataStore();
        return VertigoDataStoreManager.store;
    }
    public static ResetDataStore(): VertigoDataStore {
        VertigoDataStoreManager.store = new VertigoInMemoryDataStore();
        return VertigoDataStoreManager.store;
    }
}
