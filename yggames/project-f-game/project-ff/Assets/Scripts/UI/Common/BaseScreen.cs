using UnityEngine;

namespace ProjectF.UI
{
    /// <summary>
    /// Base class for all UI screens. Provides Show/Hide with optional simple fade.
    /// All screen scripts inherit from this.
    /// </summary>
    [RequireComponent(typeof(CanvasGroup))]
    public abstract class BaseScreen : MonoBehaviour
    {
        protected CanvasGroup CanvasGroup { get; private set; }

        protected virtual void Awake()
        {
            CanvasGroup = GetComponent<CanvasGroup>();
        }

        public virtual void Show()
        {
            gameObject.SetActive(true);
            CanvasGroup.alpha          = 1f;
            CanvasGroup.interactable   = true;
            CanvasGroup.blocksRaycasts = true;
        }

        public virtual void Hide()
        {
            CanvasGroup.alpha          = 0f;
            CanvasGroup.interactable   = false;
            CanvasGroup.blocksRaycasts = false;
            gameObject.SetActive(false);
        }
    }
}
